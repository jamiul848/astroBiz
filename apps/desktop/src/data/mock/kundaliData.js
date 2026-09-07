export const kundaliData = [
  {
    id: 'kundali-2001', customerId: 'cus-1001', createdAt: '12 Jun 2024', updatedAt: '12 Jun 2024',
    birthInformation: { dateOfBirth: '1991-04-18', timeOfBirth: '08:45', birthPlace: 'Pune, Maharashtra', latitude: '18.5204', longitude: '73.8567', timezone: 'Asia/Kolkata' },
    chart: { title: 'North Indian chart', cells: ['Ascendant', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], center: 'Chart data supplied by astrology service' },
    planetaryPositions: [
      { planet: 'Sun', sign: 'Aries', degree: '04° 12\'', house: '1', nakshatra: 'Ashwini', status: 'Direct' },
      { planet: 'Moon', sign: 'Cancer', degree: '18° 40\'', house: '4', nakshatra: 'Ashlesha', status: 'Direct' },
      { planet: 'Mars', sign: 'Gemini', degree: '27° 03\'', house: '3', nakshatra: 'Punarvasu', status: 'Direct' },
      { planet: 'Mercury', sign: 'Pisces', degree: '12° 28\'', house: '12', nakshatra: 'Uttara Bhadrapada', status: 'Retrograde' },
      { planet: 'Jupiter', sign: 'Taurus', degree: '09° 16\'', house: '2', nakshatra: 'Krittika', status: 'Direct' },
      { planet: 'Venus', sign: 'Aries', degree: '21° 55\'', house: '1', nakshatra: 'Bharani', status: 'Direct' },
    ],
    nakshatra: { name: 'Ashlesha', pada: 'Pada 2', lord: 'Mercury', moonSign: 'Cancer' },
    dashas: [
      { name: 'Mercury', startDate: '10 May 2018', endDate: '10 May 2035', status: 'Current', antardashas: [{ name: 'Mercury / Venus', startDate: '16 Jan 2024', endDate: '18 Nov 2026' }] },
      { name: 'Ketu', startDate: '10 May 2035', endDate: '10 May 2042', status: 'Upcoming', antardashas: [] },
    ],
    doshas: [
      { name: 'Mangal Dosha', status: 'Not indicated', severity: 'Low', description: 'The supplied chart data does not indicate a significant Mangal influence.' },
      { name: 'Nadi Dosha', status: 'Review recommended', severity: 'Medium', description: 'Compatibility review should be completed with the corresponding partner chart.' },
    ],
    report: { title: 'Professional summary', summary: 'A steady chart profile with a strong focus on communication, learning, and practical growth. This demo interpretation is supplied as report content and is not generated in the frontend.', highlights: ['Strong communication focus', 'Practical approach to growth', 'Review relationship compatibility with a paired chart'] },
  },
  {
    id: 'kundali-2002', customerId: 'cus-1003', createdAt: '08 Jun 2024', updatedAt: '09 Jun 2024',
    birthInformation: { dateOfBirth: '1994-01-26', timeOfBirth: '06:10', birthPlace: 'New Delhi, Delhi', latitude: '28.6139', longitude: '77.2090', timezone: 'Asia/Kolkata' },
    chart: { title: 'North Indian chart', cells: ['Ascendant', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], center: 'Chart data supplied by astrology service' },
    planetaryPositions: [
      { planet: 'Sun', sign: 'Aquarius', degree: '06° 42\'', house: '1', nakshatra: 'Dhanishta', status: 'Direct' },
      { planet: 'Moon', sign: 'Libra', degree: '14° 08\'', house: '9', nakshatra: 'Swati', status: 'Direct' },
      { planet: 'Mars', sign: 'Sagittarius', degree: '03° 51\'', house: '11', nakshatra: 'Mula', status: 'Direct' },
      { planet: 'Jupiter', sign: 'Scorpio', degree: '18° 10\'', house: '10', nakshatra: 'Jyeshtha', status: 'Direct' },
    ],
    nakshatra: { name: 'Swati', pada: 'Pada 1', lord: 'Rahu', moonSign: 'Libra' },
    dashas: [{ name: 'Venus', startDate: '22 Mar 2017', endDate: '22 Mar 2037', status: 'Current', antardashas: [{ name: 'Venus / Sun', startDate: '04 Feb 2025', endDate: '04 Feb 2026' }] }],
    doshas: [{ name: 'Mangal Dosha', status: 'Not indicated', severity: 'Low', description: 'No significant indication in the supplied demo result.' }],
    report: { title: 'Professional summary', summary: 'A thoughtful profile with emphasis on collaboration and long-range planning. The report text is mock content provided by the repository.', highlights: ['Collaborative temperament', 'Long-range planning', 'Follow-up review recommended'] },
  },
];
