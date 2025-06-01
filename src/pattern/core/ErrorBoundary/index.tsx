import React, { ReactNode } from "react";
import { Button, Text, View } from "react-native";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.info("Lỗi được bắt bởi ErrorBoundary:", error, info);
    // Bạn có thể log về server (ví dụ Sentry) tại đây nếu cần
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, color: "red", marginBottom: 10 }}>
            Đã xảy ra lỗi!
          </Text>
          <Text style={{ marginBottom: 20 }}>{this.state.error?.message}</Text>
          <Button title="Thử lại" onPress={this.handleReset} />
        </View>
      );
    }

    return this.props.children;
  }
}
