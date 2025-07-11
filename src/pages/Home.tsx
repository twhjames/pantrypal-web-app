import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/Layout/AppLayout";
import { StatCard } from "@/components/Pantry/StatCard";
import { Package, AlertTriangle, Clock, X, ChefHat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PantryItem } from "@/types";

const Home = () => {
    const navigate = useNavigate();
    const [pantryStats, setPantryStats] = useState({
        total: 0,
        expiringSoon: 0,
        expiringToday: 0,
        expired: 0,
    });
    const [expiringItems, setExpiringItems] = useState<PantryItem[]>([]);
    const [recipeSuggestions, setRecipeSuggestions] = useState<string[]>([]);
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

    useEffect(() => {
        // TODO: Replace with actual API calls to PantryPal backend
        fetchPantryStats();
        fetchExpiringItems();
        fetchRecipeSuggestions();
    }, []);

    const fetchPantryStats = async () => {
        try {
            // TODO: API Call to GET /pantry/stats endpoint
            console.log("API Call: GET /pantry/stats");

            // Mock data - replace with actual API call
            setPantryStats({
                total: 24,
                expiringSoon: 3,
                expiringToday: 1,
                expired: 0,
            });
        } catch (error) {
            console.error("Failed to fetch pantry stats:", error);
        }
    };

    const fetchExpiringItems = async () => {
        try {
            // TODO: API Call to GET /pantry/expiring endpoint
            console.log("API Call: GET /pantry/expiring");

            // Mock data - replace with actual API call
            const mockItems: PantryItem[] = [
                {
                    id: "1",
                    name: "Milk",
                    category: "dairy",
                    quantity: 1,
                    purchaseDate: "2024-06-20",
                    expiryDate: "2024-06-25",
                    status: "expiring-today",
                },
                {
                    id: "2",
                    name: "Bananas",
                    category: "fruits",
                    quantity: 6,
                    purchaseDate: "2024-06-21",
                    expiryDate: "2024-06-26",
                    status: "expiring-soon",
                },
            ];
            setExpiringItems(mockItems);
        } catch (error) {
            console.error("Failed to fetch expiring items:", error);
        }
    };

    const fetchRecipeSuggestions = async () => {
        setIsLoadingRecipes(true);
        try {
            // TODO: API Call to POST /chatbot/recommend endpoint
            console.log("API Call: POST /chatbot/recommend");

            // Mock data - replace with actual API call
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
            setRecipeSuggestions([
                "Quick Vegetable Stir-Fry with expiring vegetables",
                "Banana Bread using overripe bananas",
                "Creamy Milk-based Soup before it expires",
                "Fresh Fruit Smoothie with expiring fruits",
            ]);
        } catch (error) {
            console.error("Failed to fetch recipe suggestions:", error);
        } finally {
            setIsLoadingRecipes(false);
        }
    };

    const handleRecipeSuggestionClick = (suggestion: string) => {
        // Navigate to recipes page with the suggestion as initial chat context
        navigate("/recipes", {
            state: {
                startNewChatWithSuggestion: suggestion,
            },
        });
    };

    return (
        <AppLayout>
            <div className="pt-2 space-y-6 mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back! 👋
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Here's what's happening in your pantry today
                    </p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Items"
                        value={pantryStats.total}
                        icon={Package}
                        color="blue"
                    />
                    <StatCard
                        title="Expiring Soon"
                        value={pantryStats.expiringSoon}
                        icon={Clock}
                        color="orange"
                        description="Within 3 days"
                    />
                    <StatCard
                        title="Expiring Today"
                        value={pantryStats.expiringToday}
                        icon={AlertTriangle}
                        color="red"
                        description="Use immediately"
                    />
                    <StatCard
                        title="Expired"
                        value={pantryStats.expired}
                        icon={X}
                        color="red"
                        description="Need attention"
                    />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Expiring Items Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle
                                    className="text-orange-500"
                                    size={20}
                                />
                                Items Expiring Soon
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {expiringItems.length > 0 ? (
                                <div className="space-y-3">
                                    {expiringItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-gray-600 capitalize">
                                                    {item.category} • Qty:{" "}
                                                    {item.quantity}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-medium text-orange-600">
                                                    {item.status ===
                                                    "expiring-today"
                                                        ? "Today"
                                                        : "Soon"}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(
                                                        item.expiryDate
                                                    ).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">🎉</div>
                                    <p className="text-gray-600">
                                        Great! No items expiring soon.
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Your pantry is well managed!
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recipe Suggestions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ChefHat className="text-green-500" size={20} />
                                Recipe Suggestions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoadingRecipes ? (
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg animate-pulse"
                                        >
                                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                            <div className="h-4 bg-gray-300 rounded flex-1"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : recipeSuggestions.length > 0 ? (
                                <div className="space-y-3">
                                    {recipeSuggestions.map(
                                        (suggestion, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
                                                onClick={() =>
                                                    handleRecipeSuggestionClick(
                                                        suggestion
                                                    )
                                                }
                                            >
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <p className="text-sm text-gray-700">
                                                    {suggestion}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2">🍽️</div>
                                    <p className="text-gray-600">
                                        No recipe suggestions available.
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Add more items to your pantry!
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default Home;
