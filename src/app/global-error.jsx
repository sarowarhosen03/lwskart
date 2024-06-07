"use client";
const ErrorPage = ({ error, reset }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50">
      <div className="text-center">
        <div className="text-red-500">
          <i className="fas fa-exclamation-circle fa-5x"></i>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-blue-900">
          Something Went Wrong
        </h1>
        <p className="mt-2 text-blue-700">
          We encountered an error. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-lg font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <i className="fas fa-redo mr-2"></i>Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
