import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ProTip from "../components/ProTip";
import Layout from "../layout";
import SEO from "../components/Seo";
import SpacingGrid from "../components/Grid/SpacingGrid";
import CenteredGrid from "../components/Grid/CenteredGrid";
import FullWidthGrid from "../components/Grid/FullWidthGrid";
import AutoGrid from "../components/Grid/AutoGrid";
import ComplexGrid from "../components/Grid/ComplexGrid";
import NestedGrid from "../components/Grid/NestedGrid";
import AutoGridNoWrap from "../components/Grid/AutoGridNoWrap";
import CSSGrid from "../components/Grid/CSSGrid";
import ImageGridList from "../components/GridList/ImageGridList";
import TitlebarGridList from "../components/GridList/TitlebarGridList";
import SingleLineGridList from "../components/GridList/SingleLineGridList";
import AdvancedGridList from "../components/GridList/AdvancedGridList";
import BreakpointUp from "../components/Hidden/BreakpointUp";
import BreakpointDown from "../components/Hidden/BreakpointDown";
import BreakpointOnly from "../components/Hidden/BreakpointOnly";
import GridIntegration from "../components/Hidden/GridIntegration";
import ContainedButtons from "../components/Button/ContainedButtons";
import DisableElevation from "../components/Button/DisableElevation";
import TextButtons from "../components/Button/TextButtons";
import OutlinedButtons from "../components/Button/OutlinedButtons";
import UploadButtons from "../components/Button/UploadButtons";
import ButtonSizes from "../components/Button/ButtonSizes";
import IconLabelButtons from "../components/Button/IconLabelButtons";
import IconButtons from "../components/Button/IconButtons";
import CustomizedButtons from "../components/Button/CustomizedButtons";
import ComplexButtons from "../components/Button/ComplexButtons";
import BasicButtonGroup from "../components/ButtonGroup/BasicButtonGroup";
import GroupSizesColors from "../components/ButtonGroup/GroupSizesColors";
import GroupOrientation from "../components/ButtonGroup/GroupOrientation";
import SplitButton from "../components/ButtonGroup/SplitButton";
import Checkboxes from "../components/Checkbox/Checkboxes";
import CheckboxLabels from "../components/Checkbox/CheckboxLabels";
import CheckboxesGroup from "../components/Checkbox/CheckboxesGroup";
import FormControlLabelPosition from "../components/Checkbox/FormControlLabelPosition";
import CustomizedCheckbox from "../components/Checkbox/CustomizedCheckbox";

const Index: React.FC = () => {
  return (
    <Layout>
      <SEO title="index main" />
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Gatsby Material-UI with Typescript
        </Typography>
        <img src="https://source.unsplash.com/random/400x200" alt="" />
      </Grid>
      <SpacingGrid />
      <CenteredGrid />
      <FullWidthGrid />
      <AutoGrid />
      <ComplexGrid />
      <NestedGrid />
      <AutoGridNoWrap />
      <CSSGrid />
      <ImageGridList />
      <TitlebarGridList />
      <SingleLineGridList />
      <AdvancedGridList />
      <BreakpointUp />
      <BreakpointDown />
      <BreakpointOnly />
      <GridIntegration />
      <ContainedButtons />
      <DisableElevation />
      <TextButtons />
      <OutlinedButtons />
      <UploadButtons />
      <ButtonSizes />
      <IconLabelButtons />
      <IconButtons />
      <CustomizedButtons />
      <ComplexButtons />
      <BasicButtonGroup />
      <GroupSizesColors />
      <GroupOrientation />
      <SplitButton />
      <Checkboxes />
      <CheckboxLabels />
      <CheckboxesGroup />
      <FormControlLabelPosition />
      <CustomizedCheckbox />
      <ProTip />
    </Layout>
  );
};

export default Index;
