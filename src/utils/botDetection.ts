// Bot detection utility following Google's Rendertron guidelines
// Based on: https://developers.google.com/search/blog/2019/01/dynamic-rendering-with-rendertron

export const botUserAgents = [
  'googlebot',
  'google-structured-data-testing-tool',
  'bingbot',
  'linkedinbot',
  'mediapartners-google',
  'adsbot-google',
  'feedfetcher-google',
  'google-read-aloud',
  'duckduckbot',
  'facebookexternalhit',
  'applebot',
  'whatsapp',
  'skypeuripreview',
  'twitterbot',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'rogerbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'bitlybot',
  'linkedinbot',
  'embedly',
  'baiduspider',
  'pinterest',
  'slackbot',
  'vkShare',
  'facebookexternalhit',
  'twitterbot',
  'applebot',
  'flipboard',
  'tumblr',
  'bitlybot',
  'skypeuripreview',
  'nuzzel',
  'discordbot',
  'whatsapp',
  'lighthouse'
];

export const BOT_UA_PATTERN = new RegExp(botUserAgents.join('|'), 'i');

export const isBot = (userAgent?: string): boolean => {
  if (!userAgent) return false;
  return BOT_UA_PATTERN.test(userAgent);
};

export const shouldUseRendertron = (userAgent?: string): boolean => {
  return isBot(userAgent);
};