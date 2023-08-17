import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Dummy API endpoint to create a new user. Accepts a form submission in
 * JSON with a  `firstName` and `lastName` and returns a JSON response with
 * the same data and a `id` (big random number).
 *
 * Only accepts POST requests.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method !== 'POST') {
    res.status(405).json({
      error: 'Only POST requests are accepted',
    });
    return;
  }

  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    res.status(400).json({
      error: 'Missing first name or last name',
    });
    return;
  }

  res.status(201).json({
    ...req.body,
    id: Math.floor(Math.random() * 1000000),
  });
}
