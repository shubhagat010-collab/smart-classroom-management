// Resource Service
const Resource = require('../models/Resource');

const getAllResources = async () => {
  try {
    return await Resource.find();
  } catch (err) {
    throw new Error(`Error fetching resources: ${err.message}`);
  }
};

const addResource = async (resourceData) => {
  try {
    const resource = new Resource(resourceData);
    return await resource.save();
  } catch (err) {
    throw new Error(`Error adding resource: ${err.message}`);
  }
};

const updateResource = async (resourceId, updates) => {
  try {
    return await Resource.findByIdAndUpdate(resourceId, updates, { new: true });
  } catch (err) {
    throw new Error(`Error updating resource: ${err.message}`);
  }
};

const deleteResource = async (resourceId) => {
  try {
    return await Resource.findByIdAndDelete(resourceId);
  } catch (err) {
    throw new Error(`Error deleting resource: ${err.message}`);
  }
};

const getResourceUsage = async (resourceId) => {
  try {
    const resource = await Resource.findById(resourceId);
    return {
      resourceId,
      name: resource.name,
      totalUsageHours: resource.usageHours,
      status: resource.status,
      lastMaintenance: resource.lastMaintenance,
      nextMaintenance: resource.nextMaintenance,
    };
  } catch (err) {
    throw new Error(`Error fetching resource usage: ${err.message}`);
  }
};

const scheduleMaintenanceAlert = async (resourceId, maintenanceDate) => {
  try {
    return await updateResource(resourceId, {
      nextMaintenance: maintenanceDate,
      status: 'maintenance',
    });
  } catch (err) {
    throw new Error(`Error scheduling maintenance: ${err.message}`);
  }
};

module.exports = {
  getAllResources,
  addResource,
  updateResource,
  deleteResource,
  getResourceUsage,
  scheduleMaintenanceAlert,
};
