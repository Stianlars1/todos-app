import React, { ErrorInfo, ReactNode } from "react";
import { ErrorMessage } from "../ui/errorMessage/errorMessage";
const ErrorBoundaryMessage =
  "We're having some technical difficulties. Please refresh the page, or in worst case, come back later.";
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render(): ReactNode | null {
    const { children } = this.props;

    if (this.state.error) {
      <ErrorMessage isError={true} errorMessage={ErrorBoundaryMessage} />;
    }

    return children;
  }
}

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};
