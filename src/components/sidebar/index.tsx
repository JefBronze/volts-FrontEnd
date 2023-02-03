/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactNode } from 'react';
import Link from 'next/link'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Container,
} from '@chakra-ui/react';
import {
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiGrid,
} from 'react-icons/fi';
import { TiFlashOutline } from 'react-icons/ti'
import { IconType } from 'react-icons';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactText } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import useSWR from 'swr'
import { getProfile } from '@/services/api';

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Overview', icon: FiGrid, path: '/overview' },
  //{ name: 'Informations', icon: FiTrendingUp, path: '/info' },
  { name: 'System', icon: FiCompass, path: '/system' },
 // { name: 'Energy', icon: TiFlashOutline, path: '/energy' },
 // { name: 'Settings', icon: FiSettings, path: '/settings' },
];

function Sidebar({
  children
}: {
  children: ReactNode;
}) {
  const { data, error, isLoading } = useSWR('/vrm/info', getProfile)
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (error) return <div>falhou em carregar</div>
  if (isLoading) return <div>carregando...</div>
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav data={{
        name: data?.name,
        avatar_url: data?.avatar_url
      } as any} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
            <Container overflow={'hidden'} maxHeight='100vh' maxW='3x1' h='auto' centerContent>
    {children}
            </Container>
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image width={124} height={37} src="../voltz.svg" alt="voltz" />
        <CloseButton textColor="orange.600" display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem  key={link.name} path={link.path} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  path: string;
  children: ReactText;
}
const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
   const { pathname } = useRouter()
  return (
    <Link href={path} style={{ textDecoration: 'none' }}>
      <Flex
       my={1}
        align="center"
        p="4"
        mx="4"
        fontFamily={"Montserrat, sans-serif"}
        fontWeight={500}
        textColor={useColorModeValue('orange.600', 'orange.600')}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={path == pathname ? 'orange.600' : undefined}
        css={path == pathname ? {
          bg: 'orange.600',
          color: 'white',
        } : {
          bg: useColorModeValue('gray.200', 'gray.900'), 
          color: 'orange.600',
        }}
        _hover={{
          bg: 'orange.900',
          color: 'white',
          transition: 'linear .5s all'
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  data: VRM.Info
}
const MobileNav = ({ onOpen, data, ...rest }: MobileProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        textColor="orange.600"
        borderColor="none"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
      textColor={useColorModeValue('gray.900', 'gray.200')}
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        <Image width={124} height={37} src="../voltz.svg" alt="voltz" />
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
      <IconButton
          size="lg"
          variant="ghost"
          textColor="orange.600"
          colorScheme="orange"
          aria-label="open menu"
          marginRight={["1.5", "auto"]}
          icon={<FiBell />}
        />
        <IconButton
          display={['none', 'flex']}
          size="lg"
          variant="ghost"
          textColor="orange.600"
          aria-label="open menu"
          onClick={toggleColorMode}
          colorScheme="orange"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    data?.avatar_url
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  fontFamily={"Montserrat, sans-serif"}
                  ml="2">
                  <Text textColor={useColorModeValue('gray.900', 'orange.600')} fontSize="sm">{data?.name}</Text>
                  <Text textColor={useColorModeValue('gray.900', 'orange.200')} fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box textColor={"orange.600"} display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              textColor={useColorModeValue('gray.900', 'orange.500')}
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('white', 'gray.900')}>
              <MenuItem bg={useColorModeValue('white', 'gray.900')}>Profile</MenuItem>
              <MenuItem bg={useColorModeValue('white', 'gray.900')}>Manager</MenuItem>
              <MenuItem bg={useColorModeValue('white', 'gray.900')}>Billing</MenuItem>
              <MenuDivider borderColor={useColorModeValue('white', 'gray.900')} />
              <MenuItem bg={useColorModeValue('white', 'gray.900')}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Sidebar;