/**
 * Web Vitals reporting utility
 * Measures and reports Core Web Vitals metrics
 * @param {Function} onPerfEntry - Callback function to handle metrics
 */
const reportWebVitals = (onPerfEntry) => {
  // Validate callback function
  if (!onPerfEntry || typeof onPerfEntry !== 'function') {
    if (process.env.NODE_ENV === 'development') {
      console.warn('reportWebVitals: onPerfEntry must be a function');
    }
    return;
  }

  // Dynamically import web-vitals library
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    try {
      // Cumulative Layout Shift (CLS)
      getCLS((metric) => {
        try {
          onPerfEntry({
            ...metric,
            name: 'CLS',
            value: Math.round(metric.value * 1000) / 1000, // Round to 3 decimal places
          });
        } catch (error) {
          console.warn('Error reporting CLS:', error);
        }
      });

      // First Input Delay (FID)
      getFID((metric) => {
        try {
          onPerfEntry({
            ...metric,
            name: 'FID',
            value: Math.round(metric.value),
          });
        } catch (error) {
          console.warn('Error reporting FID:', error);
        }
      });

      // First Contentful Paint (FCP)
      getFCP((metric) => {
        try {
          onPerfEntry({
            ...metric,
            name: 'FCP',
            value: Math.round(metric.value),
          });
        } catch (error) {
          console.warn('Error reporting FCP:', error);
        }
      });

      // Largest Contentful Paint (LCP)
      getLCP((metric) => {
        try {
          onPerfEntry({
            ...metric,
            name: 'LCP',
            value: Math.round(metric.value),
          });
        } catch (error) {
          console.warn('Error reporting LCP:', error);
        }
      });

      // Time to First Byte (TTFB)
      getTTFB((metric) => {
        try {
          onPerfEntry({
            ...metric,
            name: 'TTFB',
            value: Math.round(metric.value),
          });
        } catch (error) {
          console.warn('Error reporting TTFB:', error);
        }
      });

    } catch (error) {
      console.error('Error setting up web vitals monitoring:', error);
    }
  }).catch((error) => {
    console.warn('Failed to load web-vitals library:', error);
  });
};

export default reportWebVitals;
