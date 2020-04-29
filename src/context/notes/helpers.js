import { SET_HTML_STATS, SET_MARKDOWN_STATS } from '../types';

/**
 * Helper functions for markup statistics
 */
const lineStats = (content) => {
  const splittedParagraphsArr = content.split('\n');
  return splittedParagraphsArr.length;
};

const wordStats = (content) => {
  const splittedWordsArr = content.split(' ');
  const splittedWordsNewLinesArray = splittedWordsArr.map((word) => word.split('\n'));
  const flattedWordsArr = splittedWordsNewLinesArray.flat();
  const filtereWordsdArr = flattedWordsArr.filter((word) => word.length > 0);
  return filtereWordsdArr.length;
};

const letterStats = (content) => {
  const lines = content.split('\n');
  const chraWithOutEnters = lines.filter((word) => word !== '\n' && word.length > 0);
  const charString = chraWithOutEnters.join();
  return charString.length;
};

export const updateMarkdownStats = (content) => {
  const lines = lineStats(content);
  const words = wordStats(content);
  const letters = letterStats(content);

  return {
    type: SET_MARKDOWN_STATS,
    payload: { lines, words, letters },
  };
};

export const updateHTMLStats = (node) => {
  const content = node.textContent;

  const lines = lineStats(content);
  const words = wordStats(content);
  const letters = letterStats(content);

  return {
    type: SET_HTML_STATS,
    payload: { lines, words, letters },
  };
};
