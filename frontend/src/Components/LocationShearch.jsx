import React from "react";
import { FaLocationDot } from "react-icons/fa6";

function LocationSearch({ suggstion, SetpickUp, SetOpenPanle, SetVehiclePanle }) {
    const handleSuggestionClick = (location) => {
        SetpickUp(location.name);
        SetOpenPanle(false);
    };

    return (
        <div className="p-4 mt-8">
            <h4 className="text-xl font-semibold mb-4">Suggestions</h4>
            <ul>
                {Array.isArray(suggstion) && suggstion.length > 0 ? (
                    suggstion.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(item)}
                            className="cursor-pointer bg-gray-100 p-3 rounded-lg mb-2 hover:bg-gray-200 flex items-center gap-2"
                        >
                            <FaLocationDot className="text-lg" />
                            <span>{item.name}</span> {/* केवल name रेंडर करें */}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No suggestions available</li>
                )}
            </ul>
        </div>
    );
}

export default LocationSearch;
