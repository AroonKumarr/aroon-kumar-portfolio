const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { auth, adminOnly } = require('../middleware/auth');

// Demo mode flag - set to true if MongoDB is not available
let DEMO_MODE = false;

// Check if demo mode should be active
const checkDemoMode = async () => {
  try {
    await Project.findOne().limit(1);
    DEMO_MODE = false;
  } catch (error) {
    DEMO_MODE = true;
  }
};

// Demo data for when MongoDB is not available
const demoProjects = [
  {
    _id: 'demo3',
    title: 'Robotics Control System',
    slug: 'robotics-control-system',
    description: 'ROS-based robot control with computer vision',
    techStack: ['ROS', 'Python', 'OpenCV', 'Arduino'],
    featured: false,
    views: 567
  }
];

// GET /api/projects - List all projects
router.get('/', async (req, res) => {
  try {
    await checkDemoMode();
    
    if (DEMO_MODE) {
      return res.json(demoProjects);
    }
    
    const { featured } = req.query;
    const query = featured ? { featured: true } : {};
    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    // Return demo data on error
    res.json(demoProjects);
  }
});

// GET /api/projects/:slug - Get single project
router.get('/:slug', async (req, res) => {
  try {
    await checkDemoMode();
    
    if (DEMO_MODE) {
      const project = demoProjects.find(p => p.slug === req.params.slug);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.json(project);
    }
    
    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    const project = demoProjects.find(p => p.slug === req.params.slug);
    if (project) return res.json(project);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// POST /api/projects - Create project (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/projects/:slug - Update project (admin only)
router.put('/:slug', auth, adminOnly, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { slug: req.params.slug },
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/projects/:slug - Delete project (admin only)
router.delete('/:slug', auth, adminOnly, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({ slug: req.params.slug });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;