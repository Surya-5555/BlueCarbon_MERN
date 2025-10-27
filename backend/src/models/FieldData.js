import mongoose from 'mongoose';

const fieldDataSchema = new mongoose.Schema({
  // Basic Info
  plotId: {
    type: String,
    required: [true, 'Plot ID is required'],
    trim: true
  },
  collectionDate: {
    type: Date,
    required: [true, 'Collection date is required']
  },
  gpsLatitude: {
    type: Number,
    required: [true, 'GPS Latitude is required']
  },
  gpsLongitude: {
    type: Number,
    required: [true, 'GPS Longitude is required']
  },
  plotNotes: {
    type: String,
    trim: true
  },
  
  // Vegetation Data
  species: String,
  dbh: Number,
  treeHeight: Number,
  plotDensity: Number,
  canopyCover: Number,
  survivalRate: Number,
  vegetationNotes: String,
  
  // Soil Data
  sampleDepth: Number,
  bulkDensity: Number,
  organicMatter: Number,
  soilOrganicCarbon: Number,
  soilPh: Number,
  soilTexture: String,
  soilMoisture: Number,
  soilLabResults: String,
  
  // Hydrology Data
  waterTableDepth: Number,
  salinity: Number,
  waterPh: Number,
  waterTemperature: Number,
  dissolvedOxygen: Number,
  tidalRange: Number,
  managementEvent: String,
  hydrologyNotes: String,
  
  // Photos
  photos: {
    north: String,
    south: String,
    east: String,
    west: String,
    additional: [String]
  },
  photoNotes: String,
  
  // Metadata
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'verified', 'rejected'],
    default: 'submitted'
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationNotes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt before saving
fieldDataSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
fieldDataSchema.index({ submittedBy: 1, createdAt: -1 });
fieldDataSchema.index({ plotId: 1 });
fieldDataSchema.index({ projectId: 1 });
fieldDataSchema.index({ status: 1 });

export default mongoose.model('FieldData', fieldDataSchema);

