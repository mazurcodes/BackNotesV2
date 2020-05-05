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

const EditorField = ({ input, contentValueMutator }) => {
  const handleTabKeyDown = (event) => {
    const { target, keyCode } = event;
    const { selectionStart, selectionEnd, value } = target;

    if (keyCode === 9) {
      event.preventDefault();
      const beforeCoursor = value.substring(0, selectionStart);
      const afterCoursor = value.substring(selectionEnd);
      target.value = `${beforeCoursor}  ${afterCoursor}`;
      target.selectionStart = selectionEnd + 2;
      target.selectionEnd = selectionEnd + 2;
      contentValueMutator('content', target.value);
    }
  };

  return (
    <StyledEditPreviewField>
      <StyledEditField type="text" {...input} onKeyDown={handleTabKeyDown} />
      <Spacer width="20px" height="100%" color="#ddd" />
      <PreviewField />
    </StyledEditPreviewField>
  );
};

EditorField.propTypes = {
  input: PropTypes.oneOfType([PropTypes.object]).isRequired,
  contentValueMutator: PropTypes.func.isRequired,
};

export default EditorField;
