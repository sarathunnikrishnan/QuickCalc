import express, { Request, Response } from 'express';
import History from '../models/History';

const router = express.Router();

// Get all calculation history
router.get('/', async (req: Request, res: Response) => {
  try {
    const history = await History.find().sort({ timestamp: -1 }).limit(50);
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Server error fetching history' });
  }
});

// Save a new calculation
router.post('/', async (req: Request, res: Response) => {
  try {
    const { expression, result } = req.body;
    
    if (!expression || !result) {
      return res.status(400).json({ message: 'Expression and result are required' });
    }

    const newHistory = new History({
      expression,
      result,
    });

    const savedHistory = await newHistory.save();
    res.status(201).json(savedHistory);
  } catch (error) {
    console.error('Error saving history:', error);
    res.status(500).json({ message: 'Server error saving history' });
  }
});

// Clear all history
router.delete('/', async (req: Request, res: Response) => {
  try {
    await History.deleteMany({});
    res.json({ message: 'History cleared successfully' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ message: 'Server error clearing history' });
  }
});

// Delete a single history item
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await History.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting history item:', error);
    res.status(500).json({ message: 'Server error deleting history item' });
  }
});

export default router;
