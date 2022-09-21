import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorMessage from "./components/Error";

interface Props {
  children?: ReactNode;
}

interface State {
  errorStorage: {
    isError: boolean;
    errorMessage: string;
  };
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    errorStorage: {
      isError: false,
      errorMessage: "",
    },
  };

  public static getDerivedStateFromError(error: Error): State {
    return { errorStorage: { isError: true, errorMessage: error.message } };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.errorStorage.isError) {
      return <ErrorMessage errorStorage={this.state.errorStorage} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
