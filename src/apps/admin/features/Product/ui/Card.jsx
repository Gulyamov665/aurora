import React from 'react'

function Card() {
  return (
    <div className={`${styles.col_1} mt-2`}>
      <div className={styles.title}>
        <h6>{item.name}</h6>
        <FormControlLabel
          onClick={() => handleClickTest({ ...item })}
          control={<BorderColorIcon />}
        />
      </div>
      <div className={styles.iosBtn}>
        <FormControlLabel
          label="Активность"
          control={<IOSSwitch checked={isActive} onChange={onChange} />}
        />
      </div>
    </div>
  )
}

