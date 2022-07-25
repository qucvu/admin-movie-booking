import { Container } from "@mui/system";
import { Component, ErrorInfo, ReactNode } from "react";
import maintenance from "Assets/img/maintenance.jpg";
interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container>
          <img
            src={maintenance}
            alt={maintenance}
            style={{ height: "100%", width: "100%" }}
          />
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
