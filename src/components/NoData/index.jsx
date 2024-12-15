import { Box, Typography } from "@mui/material";
import dataNotFound1 from "../../assets/Nodata.png";

const NoDatafound = ({ heading, subHeading }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <img style={{height:"25vh",width:"18vw"}} src={dataNotFound1} alt="No Data" className="noDataImg" />
            <Typography color="primary" mt={5} fontSize="1rem">
                {heading}
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={5}>
                {subHeading}
            </Typography>
        </Box>
    );
}

export default NoDatafound;
