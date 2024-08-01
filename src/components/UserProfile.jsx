import React, { useState } from "react";
import { Maximize, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import MaximumDistanceRadius from "./ExchangeItems/MaximumDistanceRadius";

const UserProfile = ({ user, logout }) => {
    const [activeTab, setActiveTab] = useState("personal");
    const [openMaxDistance, setOpenMaxDistance] = useState(false);

    const navigate = useNavigate();

    const InfoRow = ({ label, value, onUpdate }) => (
        <div className="flex items-center justify-between py-2">
            <p className="text-sm text-gray-600">
                {label}:{" "}
                <span className="font-medium text-gray-900">
                    {value || "Not set"}
                </span>
            </p>
            <Button onClick={onUpdate} size="sm">
                Update {label}
            </Button>
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <User className="w-16 h-16 mx-auto text-gray-400" />
                    <CardTitle className="text-2xl font-bold mt-2">
                        Your Profile
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="personal">
                                Personal Info
                            </TabsTrigger>
                            <TabsTrigger value="account">
                                Account Details
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="personal" className="mt-4">
                            <InfoRow
                                label="Full Name"
                                value={
                                    user.firstName
                                        ? `${user.firstName} ${user.lastName}`
                                        : null
                                }
                                onUpdate={() => console.log("Update name")}
                            />
                            <InfoRow
                                label="Username"
                                value={user.username}
                                onUpdate={() => console.log("Update username")}
                            />
                            <InfoRow
                                label="Max Distance"
                                value={
                                    user.max_distance
                                        ? `${user.max_distance} km`
                                        : null
                                }
                                onUpdate={setOpenMaxDistance}
                            />
                            <InfoRow
                                label="Location"
                                value={
                                    user.latitude
                                        ? `${user.latitude}, ${user.longitude}`
                                        : null
                                }
                                onUpdate={() => {
                                    navigate("/user-location");
                                }}
                            />
                        </TabsContent>
                        <TabsContent value="account" className="mt-4">
                            <InfoRow
                                label="Email"
                                value={user.email}
                                onUpdate={() => console.log("Update email")}
                            />
                            <InfoRow
                                label="Password"
                                value="********"
                                onUpdate={() => {}}
                            />
                        </TabsContent>
                    </Tabs>
                    <div className="mt-6 text-center">
                        <Button variant="destructive" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <MaximumDistanceRadius
                open={openMaxDistance}
                setOpen={setOpenMaxDistance}
            />
        </div>
    );
};

export default UserProfile;
