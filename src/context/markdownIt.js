import MarkdownIt from 'markdown-it';
import mdToc from 'markdown-it-table-of-contents';
import mdAnchor from 'markdown-it-anchor';

const mdIt = new MarkdownIt();
mdIt.use(mdToc);
mdIt.use(mdAnchor);

export default mdIt;
