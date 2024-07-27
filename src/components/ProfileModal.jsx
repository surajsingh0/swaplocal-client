import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit2, Save } from "lucide-react";

export default function ProfileModal({ open, setOpen }) {
    const isDesktop = "(min-width: 768px)";

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-white">Your Profile</DialogTitle>
                    </DialogHeader>
                    <ProfileView />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Your Profile</DrawerTitle>
                </DrawerHeader>
                <ProfileView className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function ProfileView({ className }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleInputChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser(editedUser);
        localStorage.setItem("user", JSON.stringify(editedUser));
        setIsEditing(false);
        // Here you would typically also send an API request to update the user on the server
        alert("Profile updated successfully!");
    };

    const toggleEdit = () => {
        if (isEditing) {
            setEditedUser(user);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className={cn("w-full text-white", className)}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <Button onClick={toggleEdit} variant="outline">
                    {isEditing ? (
                        <Save className="mr-2 h-4 w-4" />
                    ) : (
                        <Edit2 className="mr-2 h-4 w-4" />
                    )}
                    {isEditing ? "Save" : "Edit"}
                </Button>
            </div>
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="account">Account Details</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            {isEditing ? (
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    value={editedUser.fullName || ""}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{user.fullName || "Not set"}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            {isEditing ? (
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={editedUser.bio || ""}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            ) : (
                                <p>{user.bio || "No bio available"}</p>
                            )}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="account">
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <p>{user.email}</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="joinDate">Joined</Label>
                            <p>
                                {new Date(user.joinDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
            {isEditing && (
                <div className="mt-4">
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            )}
        </div>
    );
}
