import { FC, Fragment } from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { SidebarSectionProps } from '../types'
import { Link } from 'react-router-dom'

export const SidebarSection: FC<SidebarSectionProps>  = ({buttonGroups, handleGroupToggle, openGroup, handleSidebar}) => {
  return (
    <Box height="75%" component="nav" role="navigation">
        <List>
          {buttonGroups.map((group, groupIndex) => (
            <Fragment key={groupIndex}>
              <ListItemButton onClick={() => handleGroupToggle(group.title)}>
                <ListItemIcon>{group.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography color="white" fontWeight={500}>
                      {group.title}
                    </Typography>
                  }
                />
                {openGroup === group.title ? (
                  <ExpandLess sx={{ color: "white" }} />
                ) : (
                  <ExpandMore sx={{ color: "white" }} />
                )}
              </ListItemButton>

              <Collapse in={openGroup === group.title} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {group.buttons.map(({ text, icon, link }, i) => (
                    <ListItemButton
                      key={i}
                      component={Link}
                      to={link}
                      sx={{ pl: 4 }}
                      onClick={handleSidebar}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} sx={{color: "white"}} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>

              {groupIndex < buttonGroups.length - 1 && (
                <Divider sx={{ opacity: 0.1, my: 1 }} />
              )}
            </Fragment>
          ))}
        </List>
      </Box>
  )
}
