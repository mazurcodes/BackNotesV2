import MarkdownIt from 'markdown-it';
import mdAnchor from 'markdown-it-anchor';
import mdToc from 'markdown-it-table-of-contents';

const mdIt = new MarkdownIt();
mdIt.use(mdAnchor).use(mdToc);

export default mdIt;
