function findTitle(attributeTitle : string) : string {
    let resTitle = "";
    console.log("attributeTitle", attributeTitle);
    if (attributeTitle === "installationsMintedTotal") {
        resTitle = "INSTALLATIONS MINTED";
    } else if (attributeTitle === "tilesMinted" ) {
        resTitle = "TILES MINTED";
    }


    console.log("resTitle", resTitle);

    return resTitle;

}

export default findTitle;