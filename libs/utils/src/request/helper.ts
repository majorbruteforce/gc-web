export const getDynamicUrlElements = (url: string) => {
  // Extract dynamic elements from the URL using regular expressions
  const regex = /\/([^/]+)/g;
  const dynamicElements = [];
  let match;

  while ((match = regex.exec(url)) !== null) {
    dynamicElements.push(match[1]);
  }

  return dynamicElements;
};

export const getEventLogo = (organiserId: number, imageName: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_CDN_PATH}/logo/${organiserId}/300/${imageName}`;
};

export const getUserImage = (imageName?: string) => {
  if (imageName) {
    return `${process.env.NEXT_PUBLIC_BASE_CDN_PATH}/profile/thumb/${imageName}`;
  } else {
    return `${process.env.NEXT_PUBLIC_BASE_CDN_PATH}/community/assets/default_thumb.png`;
  }
};
