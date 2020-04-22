import styled from 'styled-components';

/**
 * Spacer component
 *
 *        props:
 *           height: in % of parent or px,
 *           width: in % of parent or px,
 *           color: color of the component (lightgray default)
 *
 *         syntax: <EditorField height="20px" width="100%" color="#454545" />
 */
const Spacer = styled.div`
  background-color: ${({ color = 'lightgray' }) => color};
  height: ${({ height = '10px' }) => height};
  width: ${({ width = '10px' }) => width};
`;

export default Spacer;
