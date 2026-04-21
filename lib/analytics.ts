import { BetaAnalyticsDataClient } from '@google-analytics/data'

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA4_CLIENT_EMAIL,
    private_key: process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
})

const propertyId = process.env.GA4_PROPERTY_ID

export async function getAnalyticsStats() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: propertyId,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
      ],
    })

    const row = response.rows?.[0]
    return {
      users: parseInt(row?.metricValues?.[0]?.value ?? '0'),
      sessions: parseInt(row?.metricValues?.[1]?.value ?? '0'),
      pageViews: parseInt(row?.metricValues?.[2]?.value ?? '0'),
      bounceRate: parseFloat(row?.metricValues?.[3]?.value ?? '0').toFixed(1),
    }
  } catch (e) {
    console.error('GA4 error:', e)
    return { users: 0, sessions: 0, pageViews: 0, bounceRate: '0' }
  }
}

export async function getTopPages() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: propertyId,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 5,
    })

    return (response.rows ?? []).map((row) => ({
      page: row.dimensionValues?.[0]?.value ?? '',
      views: parseInt(row.metricValues?.[0]?.value ?? '0'),
    }))
  } catch (e) {
    console.error('GA4 top pages error:', e)
    return []
  }
}

export async function getTrafficSources() {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: propertyId,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 5,
    })

    return (response.rows ?? []).map((row) => ({
      source: row.dimensionValues?.[0]?.value ?? '',
      sessions: parseInt(row.metricValues?.[0]?.value ?? '0'),
    }))
  } catch (e) {
    console.error('GA4 traffic sources error:', e)
    return []
  }
}