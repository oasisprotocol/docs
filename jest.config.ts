import type {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: 'ts-jest/presets/js-with-babel-esm',
};

export default config;
