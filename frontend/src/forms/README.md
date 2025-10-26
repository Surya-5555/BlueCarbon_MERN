# Methodology Forms Directory

This directory contains comprehensive data collection forms for various blue carbon methodologies.

## Forms to be Implemented

### 1. VM0033 Form (VM0033Form.tsx)
**Sections:**
- Spatial Mapping
- Vegetation Data
- Soil/Peat/Sediment
- Hydrology
- Soil Chemistry
- GHG Flux
- Management Events
- Remote Sensing
- QA/QC
- Buffer & Risk
- Historic Data
- Declaration

### 2. VM0007 Form (VM0007Form.tsx)
**Sections:**
- Spatial Mapping
- Vegetation Data
- Soil/Peat/Sediment
- Water Table
- Soil Chemistry
- GHG Fluxes
- Management Events
- Remote Sensing
- QA/QC
- Buffer & Risk
- Historic Data
- Declaration

### 3. Gold Standard Form (GoldStandardForm.tsx)
**Sections:**
- Project & Spatial Mapping
- Remote Sensing Inputs
- Elevation Mapping
- Vegetation
- Land Cover
- Soil/Peat/Sediment
- Spectral Indices
- Management Events
- QA/QC
- Carbon Pools
- Emissions Estimates
- Historical Data
- Declaration

### 4. Plan Vivo Form (PlanVivoForm.tsx)
**Sections:**
- Project Info
- Area Mapping
- Land Cover Change
- Drivers of Deforestation
- Vegetation/Biomass
- Soil Organic Carbon
- Emission Factors
- Photo Documentation
- Remote Sensing
- Salinity/Hydrology
- Intervention Logs
- Fossil Fuel Use
- Regulatory Surplus
- Historic Data
- Declaration

### 5. IPCC Form (IPCCForm.tsx)
**Sections:**
- Project & Spatial Mapping
- Land Cover Classification
- Vegetation
- Soil/Sediment
- Water Table & Salinity
- Management Events
- GHG Flux
- Spectral Indices
- Remote Sensing
- Fuel/Operations
- Buffer & Risk
- Socioeconomic/Regulatory
- QA/QC
- Historic Data
- Certification
- Declaration

## Implementation Guidelines

Each form should:
- Use a stepper or tabbed interface for navigation
- Implement comprehensive validation using React Hook Form + Zod
- Support file uploads for documentation
- Include proper error handling and user feedback
- Be fully responsive
- Auto-save progress when possible

## Usage

Forms will be accessible from the Landing Page methodology cards and from the NGO Dashboard for project submissions.
