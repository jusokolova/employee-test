import { FC } from 'react';

import { Button } from 'components';

type SubmitButtonProps = {
  disabled: boolean,
  onClick: () => void,
}
export const SubmitButton: FC<SubmitButtonProps> = ({ disabled, onClick }) => (
  <Button disabled={disabled} onClick={onClick}>
    Сохранить
  </Button>
);
