import {Tabs, TabList, TabPanels, Tab, TabPanel, Box, Image, Text, Divider} from "@chakra-ui/react";
import aboutImage from "../../../assets/hero/About.jpg";

function AboutSection() {
    return (<Box as="section" py="14" textAlign="center" bg={"teal.400"} color={"white"}>
        <Box mx="auto">
            <Box>
                <Text as="h2" fontSize="6xl" fontWeight="bold" mb="3">About Us</Text>
                <Text fontSize="3xl">We are dedicated to providing top-quality products and exceptional service to
                    our customers.</Text>
            </Box>
            <Box
                display={{base: "block", lg: "flex"}}
                justifyContent="space-between"
                height={"70vh"}
                p={{base: "6", lg: "10"}}
            >
                <Image src={aboutImage} alt="About Us" borderRadius={"xl"}/>
                <Box flex={{base: "none", lg: "1"}} ml={{base: "auto", lg: "10"}} textAlign="left">
                    <Text fontSize="3xl" fontWeight="bold" mb="6" color="teal.50">Our Story</Text>
                    <Tabs variant="soft-rounded" colorScheme="teal">
                        <TabList mb="4" gap={2}>
                            <Tab color={"teal.50"} _selected={{color: "teal", bg: "teal.50"}}>The Journey</Tab>
                            <Tab color={"teal.50"} _selected={{color: "teal", bg: "teal.50"}}>Our Mission</Tab>
                            <Tab color={"teal.50"} _selected={{color: "teal", bg: "teal.50"}}>Core Values</Tab>
                        </TabList>
                        <Divider mb="4"/>
                        <TabPanels>
                            <TabPanel>
                                <Text fontSize="lg" color="teal.50" mb="4">
                                    We weren't always an online store! Our journey began in 2000 as a local
                                    brick-and-mortar store. Driven by a passion for exceptional customer service and
                                    high-quality products, we expanded online in 2005. By 2020, we'd served over 1
                                    million happy customers!
                                </Text>
                                <Text fontSize="lg" color="teal.50" mb="2">
                                    - From Humble Beginnings (2000): A local store is born.
                                </Text>
                                <Text fontSize="lg" color="teal.50" mb="2">
                                    - Going Digital (2005): We expand our reach online.
                                </Text>
                                <Text fontSize="lg" color="teal.50" mb="2">
                                    - Reaching a 350,000 Smiles (2023): We celebrate a milestone!
                                </Text>
                            </TabPanel>
                            <TabPanel>
                                <Text fontSize="lg" color="teal.50" mb="4">
                                    Our mission is to make online shopping a breeze. We believe everyone deserves a
                                    convenient, enjoyable, and accessible shopping experience. That's why we offer a
                                    wide range of top-notch products at competitive prices, backed by exceptional
                                    customer service.
                                </Text>
                                <Text fontSize="lg" color="teal.50" mb="2">
                                    - Seamless Shopping: Find what you need, effortlessly.
                                </Text>
                                <Text fontSize="lg" color="teal.50" mb="2">
                                    - Happy Customers: Prompt support keeps you smiling.
                                </Text>
                                <Text fontSize="lg" color="teal.50" mb="2">
                                    - Always Improving: We adapt to serve you better.
                                </Text>
                            </TabPanel>
                            <TabPanel>
                                <Text fontSize="lg" color="teal.50" mb="4">
                                    Our core values are the foundation of who we are:
                                </Text>
                                <Text fontSize="lg" color="teal.50" mb="2">
                                    - Your needs and satisfaction are our top priority.
                                </Text>
                                <Text fontSize="lg" color="teal.50" mb="2">
                                    - We operate with honesty, transparency, and accountability.
                                </Text>
                                <Text fontSize="lg" color="teal.50" mb="2">
                                    - We embrace change and continuously improve to serve you best.
                                </Text>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </Box>
    </Box>);
}

export default AboutSection;
