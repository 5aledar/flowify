import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' }) // Only POST is allowed
    }

    try {
        const { path } = req.body

        if (!path) {
            return res.status(400).json({ error: 'Path is required' })
        }

        // Trigger revalidation for the specified path
        await res.revalidate(path)
        return res.status(200).json({ success: true })
    } catch (error) {
        console.error('Error revalidating:', error)
        return res.status(500).json({ error: 'Failed to revalidate' })
    }
}
