import FieldData from '../models/FieldData.js';

// Create new field data entry
export const createFieldData = async (req, res) => {
  try {
    const fieldData = new FieldData({
      ...req.body,
      submittedBy: req.user.id, // Add authenticated user ID
      status: 'submitted'
    });

    await fieldData.save();

    res.status(201).json({
      success: true,
      message: 'Field data saved successfully',
      data: {
        fieldData
      }
    });
  } catch (error) {
    console.error('Create field data error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to save field data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Save field data as draft
export const saveDraft = async (req, res) => {
  try {
    const fieldData = new FieldData({
      ...req.body,
      submittedBy: req.user.id,
      status: 'draft'
    });

    await fieldData.save();

    res.status(201).json({
      success: true,
      message: 'Draft saved successfully',
      data: {
        fieldData
      }
    });
  } catch (error) {
    console.error('Save draft error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save draft',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all field data entries (with filters)
export const getAllFieldData = async (req, res) => {
  try {
    const { status, projectId, submittedBy, startDate, endDate } = req.query;
    
    const filter = {};
    
    if (status) filter.status = status;
    if (projectId) filter.projectId = projectId;
    if (submittedBy) filter.submittedBy = submittedBy;
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const fieldData = await FieldData.find(filter)
      .populate('submittedBy', 'name email role')
      .populate('verifiedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        fieldData,
        count: fieldData.length
      }
    });
  } catch (error) {
    console.error('Get field data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve field data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get single field data entry by ID
export const getFieldDataById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const fieldData = await FieldData.findById(id)
      .populate('submittedBy', 'name email role')
      .populate('verifiedBy', 'name email');

    if (!fieldData) {
      return res.status(404).json({
        success: false,
        message: 'Field data not found'
      });
    }

    res.json({
      success: true,
      data: {
        fieldData
      }
    });
  } catch (error) {
    console.error('Get field data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve field data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get my field data entries
export const getMyFieldData = async (req, res) => {
  try {
    const fieldData = await FieldData.find({ submittedBy: req.user.id })
      .populate('verifiedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        fieldData,
        count: fieldData.length
      }
    });
  } catch (error) {
    console.error('Get my field data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve your field data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Update field data entry
export const updateFieldData = async (req, res) => {
  try {
    const { id } = req.params;
    
    const fieldData = await FieldData.findById(id);

    if (!fieldData) {
      return res.status(404).json({
        success: false,
        message: 'Field data not found'
      });
    }

    // Check if user is authorized to update
    if (fieldData.submittedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this field data'
      });
    }

    Object.assign(fieldData, req.body);
    await fieldData.save();

    res.json({
      success: true,
      message: 'Field data updated successfully',
      data: {
        fieldData
      }
    });
  } catch (error) {
    console.error('Update field data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update field data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Verify field data (Admin/Verifier only)
export const verifyFieldData = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, verificationNotes } = req.body;
    
    const fieldData = await FieldData.findById(id);

    if (!fieldData) {
      return res.status(404).json({
        success: false,
        message: 'Field data not found'
      });
    }

    // Check if user is authorized to verify
    if (!['admin', 'verifier'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to verify field data'
      });
    }

    fieldData.status = status || 'verified';
    fieldData.verifiedBy = req.user.id;
    fieldData.verificationNotes = verificationNotes;
    await fieldData.save();

    res.json({
      success: true,
      message: `Field data ${status || 'verified'} successfully`,
      data: {
        fieldData
      }
    });
  } catch (error) {
    console.error('Verify field data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify field data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Delete field data entry
export const deleteFieldData = async (req, res) => {
  try {
    const { id } = req.params;
    
    const fieldData = await FieldData.findById(id);

    if (!fieldData) {
      return res.status(404).json({
        success: false,
        message: 'Field data not found'
      });
    }

    // Check if user is authorized to delete
    if (fieldData.submittedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this field data'
      });
    }

    await FieldData.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Field data deleted successfully'
    });
  } catch (error) {
    console.error('Delete field data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete field data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

