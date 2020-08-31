module.exports = {
  "moduleNameMapper": {
    '\\.(jpg|jpeg|png|gif|webp|svg)$': 'identity-obj-proxy',
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  "setupFilesAfterEnv": ["./src/setupTests.ts"],
};
