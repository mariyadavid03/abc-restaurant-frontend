import React, {useState} from "react";
import "./MenuStyle.css"; 
import Appetizers from "../../../components/Menu/Appetizers";
import MainCourses from "../../../components/Menu/MainCourses";
import Beverages from "../../../components/Menu/Beverages";
import Desserts from "../../../components/Menu/Desserts";
import Header from "../../../components/Header/PublicHeader/Header";

function MenuPage(){
    const [activeTab, setActiveTab] = useState("appetizers")
    const renderMenuItems = () =>{
        switch (activeTab) {
            case "appetizers":
                return <Appetizers />;
            case "main":
                return <MainCourses />;
            case "dessert":
                return <Desserts />;
            case "beverages":
                return <Beverages />;
            default:
                return <Appetizers />;
        }
    };

    return(
        <><Header />
        <div className="menu-page">
            <h2><center>Menu</center></h2>
            <div className="menu-container">
            <div className="tab-container">
                <button
                    className={`tab-button ${activeTab === "appetizers" ? "active" : ""}`}
                    onClick={() => setActiveTab("appetizers")}
                >
                    Appetizers
                </button>
                <button
                    className={`tab-button ${activeTab === "main" ? "active" : ""}`}
                    onClick={() => setActiveTab("main")}
                >
                    Main Courses
                </button>
                <button
                    className={`tab-button ${activeTab === "dessert" ? "active" : ""}`}
                    onClick={() => setActiveTab("dessert")}
                >
                    Desserts
                </button>
                <button
                    className={`tab-button ${activeTab === "beverages" ? "active" : ""}`}
                    onClick={() => setActiveTab("beverages")}
                >
                    Beverages
                </button>
            </div>
            <div className="menu-items-container">
                {renderMenuItems()}
            </div>
            </div>
            
        </div></>
    );
}
export default MenuPage;