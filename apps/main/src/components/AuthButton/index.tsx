import React, { ReactNode } from "react";
import { Button, ButtonProps } from "antd";
import { useAppSelector } from 'store/hooks';

interface Props extends ButtonProps {
  children?: ReactNode;
  code: string;
}

function AuthButton({ children, code, ...rest }: Props) {
  const menus = useAppSelector(
    (state) => state.login.menus
  );
  // TODO: 根据权限系统显示隐藏按钮，或者将按钮禁用
  return menus.some((v) => v.code === code) ? (
    <Button {...rest}>{children}</Button>
  ) : null;
}

const MemoAuthButton = React.memo(AuthButton);

export default MemoAuthButton;

