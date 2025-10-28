import FieldData from '../models/FieldData.js';

// Create new field data entry
export const createFieldData = async (req, res) => {
  try {
    console.log('[createFieldData] content-type=multipart?', !!req.files, 'fields:', Object.keys(req.body || {}));
    if (req.files) {
      const fileSummary = Object.fromEntries(
        Object.entries(req.files).map(([k, v]) => [k, Array.isArray(v) ? v.length : 0])
      );
      console.log('[createFieldData] file counts:', fileSummary);
    }
    // Whitelist and coerce values
    const body = req.body || {};
    const data = {
      // Basic
      plotId: body.plotId,
      collectionDate: body.collectionDate,
      gpsLatitude: body.gpsLatitude != null ? Number(body.gpsLatitude) : undefined,
      gpsLongitude: body.gpsLongitude != null ? Number(body.gpsLongitude) : undefined,
      plotNotes: body.plotNotes,
      projectId: body.projectId,
      // Vegetation
      species: body.species,
      dbh: body.dbh != null ? Number(body.dbh) : undefined,
      treeHeight: body.treeHeight != null ? Number(body.treeHeight) : undefined,
      plotDensity: body.plotDensity != null ? Number(body.plotDensity) : undefined,
      canopyCover: body.canopyCover != null ? Number(body.canopyCover) : undefined,
      survivalRate: body.survivalRate != null ? Number(body.survivalRate) : undefined,
      vegetationNotes: body.vegetationNotes,
      // Soil
      sampleDepth: body.sampleDepth != null ? Number(body.sampleDepth) : undefined,
      bulkDensity: body.bulkDensity != null ? Number(body.bulkDensity) : undefined,
      organicMatter: body.organicMatter != null ? Number(body.organicMatter) : undefined,
      soilOrganicCarbon: body.soilOrganicCarbon != null ? Number(body.soilOrganicCarbon) : (body.soc != null ? Number(body.soc) : undefined),
      soilPh: body.soilPh != null ? Number(body.soilPh) : undefined,
      soilTexture: body.soilTexture,
      soilMoisture: body.soilMoisture != null ? Number(body.soilMoisture) : undefined,
      soilLabResults: body.soilLabResults,
      // Hydrology
      waterTableDepth: body.waterTableDepth != null ? Number(body.waterTableDepth) : undefined,
      salinity: body.salinity != null ? Number(body.salinity) : undefined,
      waterPh: body.waterPh != null ? Number(body.waterPh) : undefined,
      waterTemperature: body.waterTemperature != null ? Number(body.waterTemperature) : (body.waterTemp != null ? Number(body.waterTemp) : undefined),
      dissolvedOxygen: body.dissolvedOxygen != null ? Number(body.dissolvedOxygen) : undefined,
      tidalRange: body.tidalRange != null ? Number(body.tidalRange) : undefined,
      managementEvent: body.managementEvent,
      hydrologyNotes: body.hydrologyNotes,
      // Photos (from multer upload or provided URLs)
      photos: body.photos,
      photoNotes: body.photoNotes,
    };

    // If multer files present, map them to base64 data URLs (memory storage)
    if (req.files) {
      const makeDataUrl = (file) => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      data.photos = {
        ...(data.photos || {}),
        north: req.files.photoNorth?.[0] ? makeDataUrl(req.files.photoNorth[0]) : (data.photos?.north || undefined),
        south: req.files.photoSouth?.[0] ? makeDataUrl(req.files.photoSouth[0]) : (data.photos?.south || undefined),
        east: req.files.photoEast?.[0] ? makeDataUrl(req.files.photoEast[0]) : (data.photos?.east || undefined),
        west: req.files.photoWest?.[0] ? makeDataUrl(req.files.photoWest[0]) : (data.photos?.west || undefined),
        additional: [
          ...(Array.isArray(data.photos?.additional) ? data.photos.additional : []),
          ...(req.files.photoAdditional ? req.files.photoAdditional.map(makeDataUrl) : []),
        ].filter(Boolean)
      };
      // Optional lab results file
      if (req.files.soilLabResults?.[0]) {
        data.soilLabResults = makeDataUrl(req.files.soilLabResults[0]);
      }
    }

    // Require core fields on submission
    const missing = [];
    if (!data.plotId) missing.push('plotId');
    if (!data.collectionDate) missing.push('collectionDate');
    if (data.gpsLatitude == null) missing.push('gpsLatitude');
    if (data.gpsLongitude == null) missing.push('gpsLongitude');
    if (missing.length) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(', ')}`,
      });
    }

    // If a draft exists for this user and plotId, update it to submitted
    let doc = await FieldData.findOne({ submittedBy: req.user.id, plotId: data.plotId, status: 'draft' });
    if (doc) {
      // Assign simple scalar fields first
      const { photos: incomingPhotos, soilLabResults: incomingLab, ...rest } = data;
      Object.assign(doc, rest);
      // Merge photos explicitly so Mongoose tracks nested changes
      if (incomingPhotos && Object.keys(incomingPhotos).length > 0) {
        doc.photos = {
          ...(doc.photos || {}),
          ...incomingPhotos,
        };
        doc.markModified('photos');
      }
      if (incomingLab != null) {
        doc.soilLabResults = incomingLab;
      }
      doc.status = 'submitted';
      await doc.save();
    } else {
      doc = new FieldData({ ...data, submittedBy: req.user.id, status: 'submitted' });
      await doc.save();
    }

    res.status(201).json({
      success: true,
      message: 'Field data saved successfully',
      data: {
        fieldData: doc,
        processed: {
          photos: {
            north: !!doc.photos?.north,
            south: !!doc.photos?.south,
            east: !!doc.photos?.east,
            west: !!doc.photos?.west,
            additional: Array.isArray(doc.photos?.additional) ? doc.photos.additional.length : 0,
          },
          soilLabResults: !!doc.soilLabResults,
        }
      },
    });
  } catch (error) {
    console.error('Create field data error:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, message: 'Validation error', errors });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to save field data',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
};

// Save field data as draft
export const saveDraft = async (req, res) => {
  try {
    console.log('[saveDraft] content-type=multipart?', !!req.files, 'fields:', Object.keys(req.body || {}));
    if (req.files) {
      const fileSummary = Object.fromEntries(
        Object.entries(req.files).map(([k, v]) => [k, Array.isArray(v) ? v.length : 0])
      );
      console.log('[saveDraft] file counts:', fileSummary);
    }
    // Upsert draft: if a draft with same plotId (if provided) exists for this user, update it; else create new
    const filter = { submittedBy: req.user.id, status: 'draft' };
    if (req.body.plotId) {
      filter.plotId = req.body.plotId;
    }

    // Build update payload and handle optional uploaded files to photos (as base64)
    const makeDataUrl = (file) => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const update = { ...req.body };

    if (req.files) {
      const photos = {
        ...(update.photos || {}),
        north: req.files.photoNorth?.[0] ? makeDataUrl(req.files.photoNorth[0]) : (update.photos?.north || undefined),
        south: req.files.photoSouth?.[0] ? makeDataUrl(req.files.photoSouth[0]) : (update.photos?.south || undefined),
        east: req.files.photoEast?.[0] ? makeDataUrl(req.files.photoEast[0]) : (update.photos?.east || undefined),
        west: req.files.photoWest?.[0] ? makeDataUrl(req.files.photoWest[0]) : (update.photos?.west || undefined),
        additional: [
          ...(Array.isArray(update.photos?.additional) ? update.photos.additional : []),
          ...(req.files.photoAdditional ? req.files.photoAdditional.map(makeDataUrl) : []),
        ].filter(Boolean)
      };
      update.photos = photos;
      // Optional lab results file
      if (req.files.soilLabResults?.[0]) {
        update.soilLabResults = makeDataUrl(req.files.soilLabResults[0]);
      }
    }

    update.submittedBy = req.user.id;
    update.status = 'draft';

    const options = { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true };

    const fieldData = await FieldData.findOneAndUpdate(filter, update, options);

    res.status(201).json({
      success: true,
      message: 'Draft saved successfully',
      data: {
        fieldData,
        processed: {
          photos: {
            north: !!fieldData.photos?.north,
            south: !!fieldData.photos?.south,
            east: !!fieldData.photos?.east,
            west: !!fieldData.photos?.west,
            additional: Array.isArray(fieldData.photos?.additional) ? fieldData.photos.additional.length : 0,
          },
          soilLabResults: !!fieldData.soilLabResults,
        }
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

