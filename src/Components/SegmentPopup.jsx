// src/components/SegmentPopup.jsx
import { useState } from "react";
import axios from "axios";
import { X, Plus, Save, Layers } from "lucide-react";

// Schema options
const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

export default function SegmentPopup({ onClose }) {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [currentSchema, setCurrentSchema] = useState("");

  // Add selected schema to blue box
  const addSchema = () => {
    if (!currentSchema) return;
    setSelectedSchemas([...selectedSchemas, currentSchema]);
    setCurrentSchema(""); // Reset dropdown after adding
  };

  // Remove a schema from selectedSchemas
  const removeSchema = (index) => {
    setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));
  };

  // Update an existing schema dropdown
  const handleSchemaChange = (index, value) => {
    const updated = [...selectedSchemas];
    updated[index] = value;
    setSelectedSchemas(updated);
  };

  // Save segment and POST to webhook via Vite proxy
  const saveSegment = async () => {
    if (!segmentName.trim()) {
      alert("Please enter a segment name");
      return;
    }
    if (selectedSchemas.length === 0) {
      alert("Please add at least one schema");
      return;
    }

    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map((val) => {
        const found = schemaOptions.find((s) => s.value === val);
        return { [val]: found.label };
      }),
    };

    try {
      // Using Vite proxy: send to /api instead of full webhook URL
      await axios.post("/api", payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Segment saved! Check webhook.site for payload.");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving segment. Check console for details.");
    }
  };

  // Filter options to prevent duplicates
  const availableOptions = schemaOptions.filter(
    (o) => !selectedSchemas.includes(o.value)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Create Segment</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Segment Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Segment Name
            </label>
            <input
              type="text"
              placeholder="Enter segment name"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-base"
            />
          </div>

          {/* Selected Schemas */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Selected Schemas
            </label>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 min-h-[100px] border-2 border-blue-100">
              {selectedSchemas.length === 0 ? (
                <p className="text-gray-400 text-center py-8 text-sm">
                  No schemas added yet. Add schemas from below.
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedSchemas.map((val, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <select
                          value={val}
                          onChange={(e) =>
                            handleSchemaChange(index, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base bg-white"
                        >
                          <option value="">Select Schema</option>
                          {schemaOptions
                            .filter(
                              (s) =>
                                !selectedSchemas.includes(s.value) ||
                                s.value === val
                            )
                            .map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </select>
                      </div>
                      <button
                        onClick={() => removeSchema(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Add Schema */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Add Schema
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={currentSchema}
                onChange={(e) => setCurrentSchema(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-base bg-white"
              >
                <option value="">Select a schema to add</option>
                {availableOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={addSchema}
                disabled={!currentSchema}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Schema</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={saveSegment}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
          >
            <Save className="w-5 h-5" />
            Save Segment
          </button>
        </div>
      </div>
    </div>
  );
}
