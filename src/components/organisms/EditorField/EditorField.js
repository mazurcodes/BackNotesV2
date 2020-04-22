import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextArea from '../../atoms/TextArea/TextArea';
import Spacer from '../../atoms/Spacer/Spacer';
import PreviewField from '../../atoms/PreviewField/PreviewField';

const StyledEditPreviewField = styled.div`
  flex: 1;
  display: flex;
`;

const StyledEditField = styled(TextArea)`
  flex: 1;
`;

const EditorField = ({ input }) => (
  <StyledEditPreviewField>
    <StyledEditField type="text" {...input} />
    <Spacer width="20px" height="100%" color="#ddd" />
    <PreviewField />
  </StyledEditPreviewField>
);

EditorField.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default EditorField;
