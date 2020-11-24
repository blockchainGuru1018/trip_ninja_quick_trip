module.exports = {
  "moduleNameMapper": {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy',
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  "setupFilesAfterEnv": [
    "jest-canvas-mock",
    "./src/setupTests.ts"
  ],
};
