import React from 'react';

const CardSkeleton = () => (
    <div className="bg-white border border-gray-100 p-4 animate-pulse">
        <div className="bg-gray-200 h-64 w-full mb-4" />
        <div className="h-4 bg-gray-200 w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 w-1/2" />
    </div>
);

const DetailSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-24 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-gray-200 h-[600px]" />
            <div className="space-y-8">
                <div className="h-8 bg-gray-200 w-3/4" />
                <div className="h-6 bg-gray-200 w-1/4" />
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200" />
                    <div className="h-4 bg-gray-200" />
                    <div className="h-4 bg-gray-200 w-5/6" />
                </div>
            </div>
        </div>
    </div>
);

export { CardSkeleton, DetailSkeleton };
