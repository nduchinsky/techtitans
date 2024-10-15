import AddButton from "../_components/Buttons/AddButton/AddButton";
import PlainHeader from "../_components/Headers/PlainHeader/PlainHeader";

export default function Listings(){

    return(
        <div>
            <PlainHeader />
            <h1>Listings Shell Page</h1>
            <div style={{paddingTop: '300px'}}>
                <AddButton />
            </div>
        </div>
    );
}