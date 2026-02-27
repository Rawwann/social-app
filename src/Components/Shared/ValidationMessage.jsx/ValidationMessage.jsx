import React from "react";

export default function ValidationMessage({ message }) {
    if (!message) return null;
    return <p className="text-red-600 text-sm">{message}</p>;
}
