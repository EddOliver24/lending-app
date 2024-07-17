import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    console.log(error, errorInfo);
  }

  reloadPage() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex flex-col justify-center items-center gap-4">
          <h1 className=" text-4xl font-bold font-body tracking-wide text-secondary-100 ">
            Something went wrong.
          </h1>
          <p className=" text-3xl font-bold font-body tracking-wide text-primary text-center">
            {this.state.error && this.state.error.toString()}
          </p>
          <div className="info-input">
            {" "}
            <button className="info-submit text-1xl" onClick={this.reloadPage}>
              Click to refresh the page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
