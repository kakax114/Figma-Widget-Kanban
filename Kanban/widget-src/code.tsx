const { widget } = figma
const { AutoLayout, SVG, Text, Image, Frame, useSyncedState, usePropertyMenu, Input, useEffect, waitForTask } = widget

const bgColors = [
  '#DBEAFE', // Light blue (default)
  '#DCFCE7', // Light green
  '#FEF9C3', // Light yellow
  '#FCE7F3', // Light pink
  '#EDE9FE', // Light purple
  '#F1F5F9', // Light slate
  '#FFEDD5', // Light orange
  '#F3F4F6', // Light gray
  '#1E3A5F', // Deep blue
  '#1F2937', // Dark gray
]

const bgImages = [
  'https://images.unsplash.com/photo-1493589976221-c2357c31ad77?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1465175171006-6138edfc03e0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1457129962825-adcaea7406c3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1490358930084-2d26f21dc211?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1499678329028-101435549a4e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1502827413338-5a45f9a611df?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1536649986370-e623f6c7c1e1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1505142468610-359e7d316be0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1500099817043-86d46000d58f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1436891620584-47fd0e565afb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1497294815431-9365093b7331?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1499988921418-b7df40ff03f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1502085671122-2d218cd434e6?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1476610182048-b716b8518aae?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1501908734255-16579c18c25f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1505832018823-50331d70d237?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1484542603127-984f4f7d14cb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1581610186406-5f6e9f9edbc1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1482189349482-3defd547e0e9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1510784722466-f2aa240312d5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1431440869543-efaf3388c585?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1476673160081-cf065607f449?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
  'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=800&ixlib=rb-1.2.1&q=80&w=1280',
]

// Palette for the title text color picker
const titleColors = [
  '#FFFFFF', // White
  '#1B1C1D', // Near black
  '#374151', // Cool gray
  '#2563EB', // Blue
  '#7C3AED', // Violet
  '#DB2777', // Pink
  '#DC2626', // Red
  '#D97706', // Amber
  '#059669', // Emerald
  '#0891B2', // Cyan
]

const scaleMap: Record<string, number> = { S: 0.75, M: 1, L: 1.33, XL: 1.67 }
const sc = (n: number, s: number) => Math.round(n * s)

// --- Liquid glass fills ---
// Semi-transparent SolidPaint objects used throughout
const LIGHT = {
  // Column: frosted glass (background-blur will show through)
  columnFill:   { type: 'solid' as const, color: '#FFFFFF', opacity: 0.30 },
  columnStroke: { type: 'solid' as const, color: '#FFFFFF', opacity: 0.70 },
  columnShadow: { r: 0, g: 0, b: 0, a: 0.08 },
  cardShadow:   { r: 0, g: 0, b: 0, a: 0.08 },
  // Card: more opaque layer sitting on the blurred column
  cardFill:     { type: 'solid' as const, color: '#FFFFFF', opacity: 0.78 },
  cardHover:    { type: 'solid' as const, color: '#FFFFFF', opacity: 0.95 },
  cardStroke:   { type: 'solid' as const, color: '#FFFFFF', opacity: 0.95 },
  // Input frame inside add-card form
  inputBg:      { type: 'solid' as const, color: '#FFFFFF', opacity: 0.95 },
  // "Add a card" hover tint
  addHoverFill: { type: 'solid' as const, color: '#FFFFFF', opacity: 0.55 },
  // Unchecked checkbox circle
  uncheckedFill: { type: 'solid' as const, color: '#FFFFFF', opacity: 0.82 },
  // Text / icon colours (strings)
  textPrimary:      '#1B1C1D',
  textDone:         '#79797A',
  columnHeaderFill: '#1B1C1D',
  addText:          '#1B1C1D',
  uncheckedStroke:  '#6d6e6f',
  uncheckedTick:    '#6d6e6f',
  checkedBg:        '#22C55E',
  checkedHover:     '#16A34A',
  arrowColor:       '#3B4150',
  actionIcon:       '#3B4150',
  cancelIcon:       '#1B1C1D',
  // Action pill buttons
  moveBtn:          { type: 'solid' as const, color: '#EFF6FF', opacity: 1 },
  moveBtnHover:     { type: 'solid' as const, color: '#BFDBFE', opacity: 1 },
  deleteBtnHover:   { type: 'solid' as const, color: '#FEE2E2', opacity: 1 },
}

const DARK = {
  columnFill:   { type: 'solid' as const, color: '#0F172A', opacity: 0.52 },
  columnStroke: { type: 'solid' as const, color: '#FFFFFF', opacity: 0.14 },
  columnShadow: { r: 0, g: 0, b: 0, a: 0.20 },
  cardShadow:   { r: 0, g: 0, b: 0, a: 0 },
  cardFill:     { type: 'solid' as const, color: '#FFFFFF', opacity: 0.07 },
  cardHover:    { type: 'solid' as const, color: '#FFFFFF', opacity: 0.14 },
  cardStroke:   { type: 'solid' as const, color: '#FFFFFF', opacity: 0.15 },
  inputBg:      { type: 'solid' as const, color: '#1E293B', opacity: 0.92 },
  addHoverFill: { type: 'solid' as const, color: '#FFFFFF', opacity: 0.12 },
  uncheckedFill: { type: 'solid' as const, color: '#FFFFFF', opacity: 0.07 },
  textPrimary:      '#E8EDF2',
  textDone:         '#8B99A6',
  columnHeaderFill: '#E8EDF2',
  addText:          '#A0ADB8',
  uncheckedStroke:  '#8B99A6',
  uncheckedTick:    '#8B99A6',
  checkedBg:        '#22C55E',
  checkedHover:     '#16A34A',
  arrowColor:       '#C8D3DC',
  actionIcon:       '#C8D3DC',
  cancelIcon:       '#C8D3DC',
  // Action pill buttons
  moveBtn:          { type: 'solid' as const, color: '#3B82F6', opacity: 0.14 },
  moveBtnHover:     { type: 'solid' as const, color: '#3B82F6', opacity: 0.30 },
  deleteBtnHover:   { type: 'solid' as const, color: '#EF4444', opacity: 0.18 },
}

const App = () => {

  const [projectName, setProjectName] = useSyncedState('projectName', 'Project Kanban')
  const [kanban, setKanban] = useSyncedState('kanban', {
    'column-1': { name: 'To Do',       items: ['New Task'] },
    'column-2': { name: 'In Progress', items: [] },
    'column-3': { name: 'Done',        items: [] },
  })

  const [bgColor, setBgColor]   = useSyncedState('bgColor', '#DBEAFE')
  const [bgType, setBgType]     = useSyncedState<'color' | 'image'>('bgType', 'image')
  const [bgImage, setBgImage]   = useSyncedState('bgImage', '')
  const [titleColor, setTitleColor] = useSyncedState('titleColor', '#FFFFFF')
  const [widgetSize, setWidgetSize] = useSyncedState<'S' | 'M' | 'L' | 'XL'>('widgetSize', 'M')
  const [darkMode, setDarkMode] = useSyncedState('darkMode', true)

  const s = scaleMap[widgetSize] ?? 1
  const t = darkMode ? DARK : LIGHT

  usePropertyMenu(
    [
      {
        itemType: 'dropdown',
        propertyName: 'bgMode',
        tooltip: 'Background Type',
        selectedOption: bgType,
        options: [
          { option: 'color', label: 'Color' },
          { option: 'image', label: 'Image' },
        ],
      },
      { itemType: 'separator' },
      ...(bgType === 'color'
        ? [{
            itemType: 'color-selector' as const,
            propertyName: 'bgColor',
            tooltip: 'Widget Background Color',
            selectedOption: bgColor,
            options: bgColors.map(c => ({ option: c, tooltip: c })),
          }]
        : [{
            itemType: 'action' as const,
            propertyName: 'changeImage',
            tooltip: 'Change Background Image',
          }]
      ),
      { itemType: 'separator' },
      {
        itemType: 'color-selector',
        propertyName: 'titleColor',
        tooltip: 'Project Title Color',
        selectedOption: titleColor,
        options: titleColors.map(c => ({ option: c, tooltip: c })),
      },
      { itemType: 'separator' },
      {
        itemType: 'dropdown',
        propertyName: 'widgetSize',
        tooltip: 'Widget Size',
        selectedOption: widgetSize,
        options: [
          { option: 'S', label: 'S' },
          { option: 'M', label: 'M' },
          { option: 'L', label: 'L' },
          { option: 'XL', label: 'XL' },
        ],
      },
      {
        itemType: 'toggle',
        propertyName: 'darkMode',
        tooltip: 'Dark Mode',
        isToggled: darkMode,
      },
    ],
    ({ propertyName, propertyValue }) => {
      if (propertyName === 'bgMode' && propertyValue) {
        setBgType(propertyValue as 'color' | 'image')
      } else if (propertyName === 'bgColor' && propertyValue) {
        setBgColor(propertyValue)
      } else if (propertyName === 'changeImage') {
        setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)])
      } else if (propertyName === 'titleColor' && propertyValue) {
        setTitleColor(propertyValue)
      } else if (propertyName === 'widgetSize' && propertyValue) {
        setWidgetSize(propertyValue as 'S' | 'M' | 'L' | 'XL')
      } else if (propertyName === 'darkMode') {
        setDarkMode(!darkMode)
      }
    }
  )

  const [name, setName]       = useSyncedState<string>('name', '')
  const [photoUrl, setPhotoUrl] = useSyncedState<string | null>('photoUrl', null)
  const [addingToColumn, setAddingToColumn] = useSyncedState<string | null>('addingToColumn', null)
  const [draftText, setDraftText]   = useSyncedState('draftText', '')
  const [addTrigger, setAddTrigger] = useSyncedState('addTrigger', 0)

  useEffect(() => {
    if (!bgImage) {
      setBgImage(bgImages[Math.floor(Math.random() * bgImages.length)])
    }
  })

  useEffect(() => {
    if (!name) {
      if (figma.currentUser) {
        setName(figma.currentUser.name)
        setPhotoUrl(figma.currentUser.photoUrl)
      } else {
        figma.notify('Please login to figma')
      }
    }
  })

  useEffect(() => {
    if (addTrigger > 0 && addingToColumn) {
      const text = draftText.trim()
      if (text) {
        const newKanban = { ...kanban }
        newKanban[addingToColumn].items.push(text)
        setKanban(newKanban)
        setDraftText('')
      }
      setAddTrigger(0)
    }
  })

  return (
    <AutoLayout
      direction="vertical"
      padding={sc(35, s)}
      cornerRadius={sc(24, s)}
      spacing={sc(24, s)}
      effect={{
        type: 'drop-shadow',
        color: { r: 0, g: 0, b: 0, a: 0.22 },
        offset: { x: 0, y: 8 },
        blur: 40,
        spread: 0,
      }}
      fill={bgType === 'color' || !bgImage ? bgColor : { type: 'image', src: bgImage }}
    >
      <Input
        fill={titleColor}
        fontSize={sc(27, s)}
        fontWeight={700}
        value={projectName}
        onTextEditEnd={(e) => setProjectName(e.characters)}
        width='fill-parent'
      />
      <AutoLayout
        direction="horizontal"
        spacing={sc(10, s)}
        height="hug-contents"
        width="hug-contents"
        overflow='visible'
      >
        {Object.entries(kanban).map(([columnId, column]) => (
          <AutoLayout
            key={columnId}
            direction="vertical"
            spacing={sc(8, s)}
            height="hug-contents"
            width="hug-contents"
            fill={t.columnFill}
            stroke={t.columnStroke}
            strokeWidth={1}
            padding={sc(10, s)}
            cornerRadius={sc(20, s)}
            overflow="visible"
            effect={[
              { type: 'background-blur', blur: 20 },
              { type: 'drop-shadow', color: t.columnShadow, offset: { x: 0, y: 6 }, blur: 20, spread: 0 },
            ]}
          >
            <Input
              fill={t.columnHeaderFill}
              fontSize={sc(17, s)}
              fontWeight="bold"
              height="hug-contents"
              horizontalAlignText="left"
              inputBehavior="multiline"
              inputFrameProps={{
                effect: {
                  type: 'drop-shadow',
                  color: { r: 0, g: 0, b: 0, a: 0.1 },
                  offset: { x: 0, y: 0 },
                  blur: 4,
                  spread: 0,
                },
                horizontalAlignItems: 'center',
                padding: sc(8, s),
                verticalAlignItems: 'center',
              }}
              onTextEditEnd={(e) => setKanban({ ...kanban, [columnId]: { ...column, name: e.characters } })}
              value={column.name}
            />
            {column.items.map((item, index) => (
              <AutoLayout
                key={index}
                name="Card"
                fill={t.cardFill}
                hoverStyle={{ fill: t.cardHover }}
                stroke={t.cardStroke}
                strokeWidth={0.5}
                effect={{
                  type: 'drop-shadow',
                  color: t.cardShadow,
                  offset: { x: 0, y: 2 },
                  blur: 8,
                  spread: 0,
                }}
                cornerRadius={sc(12, s)}
                overflow="visible"
                spacing={sc(8, s)}
                padding={sc(10, s)}
                width={sc(300, s)}
              >
                {columnId === 'column-3' ? (
                  <Checked kanban={kanban} setKanban={setKanban} columnId={columnId} item={item} index={index} t={t} s={s} />
                ) : (
                  <Unchecked kanban={kanban} setKanban={setKanban} columnId={columnId} item={item} index={index} t={t} s={s} />
                )}
                <Input
                  name="Task"
                  fill={columnId === 'column-3' ? t.textDone : t.textPrimary}
                  width="fill-parent"
                  fontFamily="Inter"
                  fontWeight='medium'
                  fontSize={sc(14, s)}
                  onTextEditEnd={(e) => {
                    const newKanban = { ...kanban }
                    if (e.characters === '') {
                      newKanban[columnId].items.splice(index, 1)
                    } else {
                      newKanban[columnId].items[index] = e.characters
                    }
                    setKanban(newKanban)
                  }}
                  value={item}
                />
                <ReorderArrows kanban={kanban} setKanban={setKanban} columnId={columnId} index={index} t={t} s={s} />
                <Actions kanban={kanban} setKanban={setKanban} columnId={columnId} item={item} index={index} t={t} s={s} />
              </AutoLayout>
            ))}
            <Add
              kanban={kanban}
              setKanban={setKanban}
              columnId={columnId}
              addingToColumn={addingToColumn}
              setAddingToColumn={setAddingToColumn}
              draftText={draftText}
              setDraftText={setDraftText}
              addTrigger={addTrigger}
              setAddTrigger={setAddTrigger}
              t={t}
              s={s}
            />
          </AutoLayout>
        ))}
      </AutoLayout>
    </AutoLayout>
  )
}

const Unchecked = ({ kanban, setKanban, columnId, item, index, t, s }) => (
  <AutoLayout
    name="Uncheck"
    fill={t.uncheckedFill}
    stroke={t.uncheckedStroke}
    cornerRadius={99999}
    width={sc(20, s)}
    height={sc(20, s)}
    horizontalAlignItems="center"
    verticalAlignItems="center"
    hoverStyle={{ fill: '#E4F3EC', stroke: '#6DA085' }}
    onClick={() => {
      const newKanban = { ...kanban }
      newKanban['column-3'].items.push(item)
      newKanban[columnId].items.splice(index, 1)
      setKanban(newKanban)
    }}
  >
    <SVG
      name="Shape"
      height={sc(9, s)}
      width={sc(12, s)}
      src={`<svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M10.5 0.25C10.29 0.25 10.1025 0.3325 9.9675 0.4675L4.5 5.9425L2.0325 3.4675C1.8975 3.3325 1.71 3.25 1.5 3.25C1.0875 3.25 0.75 3.5875 0.75 4C0.75 4.21 0.8325 4.3975 0.9675 4.5325L3.9675 7.5325C4.1025 7.6675 4.29 7.75 4.5 7.75C4.71 7.75 4.8975 7.6675 5.0325 7.5325L11.0325 1.5325C11.1675 1.3975 11.25 1.21 11.25 1C11.25 0.5875 10.9125 0.25 10.5 0.25Z' fill='${t.uncheckedTick}'/>
</svg>`}
    />
  </AutoLayout>
)

const Checked = ({ kanban, setKanban, columnId, item, index, t, s }) => (
  <AutoLayout
    name="Check"
    fill={t.checkedBg}
    hoverStyle={{ fill: t.checkedHover }}
    cornerRadius={99999}
    width={sc(20, s)}
    height={sc(20, s)}
    horizontalAlignItems="center"
    verticalAlignItems="center"
    onClick={() => {
      const newKanban = { ...kanban }
      newKanban['column-2'].items.push(item)
      newKanban[columnId].items.splice(index, 1)
      setKanban(newKanban)
    }}
  >
    <SVG
      name="Shape"
      height={sc(9, s)}
      width={sc(12, s)}
      src="<svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path fill-rule='evenodd' clip-rule='evenodd' d='M10.5 0.25C10.29 0.25 10.1025 0.3325 9.9675 0.4675L4.5 5.9425L2.0325 3.4675C1.8975 3.3325 1.71 3.25 1.5 3.25C1.0875 3.25 0.75 3.5875 0.75 4C0.75 4.21 0.8325 4.3975 0.9675 4.5325L3.9675 7.5325C4.1025 7.6675 4.29 7.75 4.5 7.75C4.71 7.75 4.8975 7.6675 5.0325 7.5325L11.0325 1.5325C11.1675 1.3975 11.25 1.21 11.25 1C11.25 0.5875 10.9125 0.25 10.5 0.25Z' fill='white'/>
</svg>"
    />
  </AutoLayout>
)

const Add = ({ kanban, setKanban, columnId, addingToColumn, setAddingToColumn, draftText, setDraftText, addTrigger, setAddTrigger, t, s }) => {
  if (addingToColumn === columnId) {
    return (
      <AutoLayout
        direction="vertical"
        spacing={sc(8, s)}
        width={sc(300, s)}
        padding={{ top: sc(2, s) }}
        overflow="visible"
      >
        <Input
          value={draftText}
          placeholder="Enter a title for this card…"
          onTextEditEnd={(e) => setDraftText(e.characters)}
          fill={t.textPrimary}
          fontSize={sc(14, s)}
          fontFamily="Inter"
          fontWeight="medium"
          width="fill-parent"
          inputFrameProps={{
            fill: t.inputBg,
            cornerRadius: sc(10, s),
            padding: { vertical: sc(8, s), horizontal: sc(10, s) },
            effect: {
              type: 'drop-shadow',
              color: { r: 0.2, g: 0.4, b: 1, a: 0.35 },
              offset: { x: 0, y: 0 },
              blur: 0,
              spread: 2,
            },
          }}
        />
        <AutoLayout
          direction="horizontal"
          spacing={sc(8, s)}
          verticalAlignItems="center"
          overflow="visible"
        >
          <AutoLayout
            fill="#0052CC"
            hoverStyle={{ fill: '#0047B3' }}
            cornerRadius={sc(10, s)}
            padding={{ vertical: sc(7, s), horizontal: sc(14, s) }}
            onClick={() => setAddTrigger(addTrigger + 1)}
          >
            <Text fill="#FFFFFF" fontSize={sc(13, s)} fontWeight={500} fontFamily="Inter">
              Add card
            </Text>
          </AutoLayout>
          <AutoLayout
            cornerRadius={sc(6, s)}
            padding={sc(4, s)}
            hoverStyle={{ fill: t.deleteBtnHover }}
            onClick={() => { setAddingToColumn(null); setDraftText('') }}
            tooltip="Cancel"
          >
            <SVG
              width={sc(14, s)}
              height={sc(14, s)}
              src={`<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M11 3L3 11M3 3L11 11' stroke='${t.cancelIcon}' stroke-width='2' stroke-linecap='round'/>
</svg>`}
            />
          </AutoLayout>
        </AutoLayout>
      </AutoLayout>
    )
  }

  return (
    <AutoLayout
      name="Add"
      cornerRadius={sc(10, s)}
      overflow="visible"
      spacing={sc(12, s)}
      padding={{ vertical: sc(10, s), horizontal: sc(16, s) }}
      hoverStyle={{ fill: t.addHoverFill }}
      width={sc(300, s)}
      onClick={() => { setAddingToColumn(columnId); setDraftText('') }}
    >
      <SVG
        name="Vector"
        height={sc(16, s)}
        width={sc(16, s)}
        src={`<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M20 11.4286H11.4286V20H8.57143V11.4286H0V8.57143H8.57143V0H11.4286V8.57143H20V11.4286Z' fill='${t.addText}'/>
</svg>`}
      />
      <Text
        name="Task"
        fill={t.addText}
        width="fill-parent"
        fontFamily="Inter"
        fontSize={sc(14, s)}
        fontWeight={500}
      >
        Add a card
      </Text>
    </AutoLayout>
  )
}

function Actions({ kanban, setKanban, columnId, item, index, t, s }) {
  return (
    <AutoLayout name="Actions" overflow="visible" direction="vertical" horizontalAlignItems="center" spacing={sc(12, s)}>
      {/* Delete — transparent at rest, red pill on hover */}
      <AutoLayout
        name="Close"
        cornerRadius={sc(6, s)}
        hoverStyle={{ fill: t.deleteBtnHover }}
        onClick={() => {
          const newKanban = { ...kanban }
          newKanban[columnId].items.splice(index, 1)
          setKanban(newKanban)
        }}
        tooltip="Delete card"
      >
        <SVG
          name="Vector_Vector"
          height={sc(15, s)}
          width={sc(15, s)}
          src={`<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
<g clip-path='url(#clip0_224_25310)'>
<path d='M11.875 4.00625L10.9938 3.125L7.5 6.61875L4.00625 3.125L3.125 4.00625L6.61875 7.5L3.125 10.9938L4.00625 11.875L7.5 8.38125L10.9938 11.875L11.875 10.9938L8.38125 7.5L11.875 4.00625Z' fill='${t.actionIcon}'/>
</g>
<defs>
<clipPath id='clip0_224_25310'>
<rect width='15' height='15' fill='white'/>
</clipPath>
</defs>
</svg>`}
        />
      </AutoLayout>
      {columnId === 'column-1' && <Start kanban={kanban} setKanban={setKanban} columnId={columnId} item={item} index={index} t={t} s={s} />}
      {columnId === 'column-2' && <Back kanban={kanban} setKanban={setKanban} columnId={columnId} item={item} index={index} t={t} s={s} />}
    </AutoLayout>
  )
}

const Start = ({ kanban, setKanban, columnId, item, index, t, s }) => (
  <AutoLayout
    name="Start"
    fill={t.moveBtn}
    hoverStyle={{ fill: t.moveBtnHover }}
    cornerRadius={sc(6, s)}
    padding={sc(4, s)}
    onClick={() => {
      const newKanban = { ...kanban }
      newKanban['column-2'].items.push(item)
      newKanban[columnId].items.splice(index, 1)
      setKanban(newKanban)
    }}
    tooltip="Move to In Progress"
  >
    <SVG
      name="Vector_Vector"
      height={sc(15, s)}
      width={sc(15, s)}
      src="<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M2 6.5H9V4L13.5 7.5L9 11V8.5H2V6.5Z' fill='#2F80ED'/>
</svg>"
    />
  </AutoLayout>
)

const Back = ({ kanban, setKanban, columnId, item, index, t, s }) => (
  <AutoLayout
    name="Back"
    fill={t.moveBtn}
    hoverStyle={{ fill: t.moveBtnHover }}
    cornerRadius={sc(6, s)}
    padding={sc(4, s)}
    onClick={() => {
      const newKanban = { ...kanban }
      newKanban['column-1'].items.push(item)
      newKanban[columnId].items.splice(index, 1)
      setKanban(newKanban)
    }}
    tooltip="Move back to Todo"
  >
    <SVG
      name="Vector_Vector"
      height={sc(15, s)}
      width={sc(15, s)}
      src="<svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M3.76791 4.36601C3.82857 4.36601 3.8643 4.36601 3.90003 4.36601C5.69713 4.3664 7.49423 4.35335 9.29114 4.37069C11.3307 4.39036 13.0886 5.99979 13.4356 8.13309C13.7929 10.3291 12.6343 12.463 10.6688 13.2259C10.2153 13.402 9.74614 13.4956 9.26329 13.4973C8.32965 13.5008 7.39601 13.501 6.46237 13.4975C6.06546 13.4959 5.72883 13.1708 5.69438 12.7696C5.65572 12.3194 5.91153 11.9422 6.3187 11.8552C6.38669 11.8405 6.45815 11.8403 6.52815 11.8402C7.39161 11.8392 8.25507 11.8365 9.11852 11.8403C9.88944 11.8439 10.5689 11.589 11.1139 11.0053C11.8575 10.2091 12.1139 9.24415 11.8342 8.16387C11.5528 7.07637 10.8627 6.38982 9.83336 6.10733C9.63198 6.052 9.41758 6.02901 9.20904 6.02843C7.42111 6.02239 5.63318 6.02492 3.84524 6.02492C3.8271 6.02492 3.80896 6.02492 3.76846 6.02492C3.80163 6.06213 3.82234 6.08668 3.84414 6.10986C4.40066 6.70173 4.95846 7.29223 5.51352 7.88586C5.8419 8.23712 5.85326 8.76178 5.5454 9.11226C5.22655 9.47541 4.70504 9.48281 4.35962 9.12336C4.06092 8.81243 3.76773 8.49565 3.47215 8.1814C2.74503 7.40835 2.01791 6.6353 1.29079 5.86224C0.904325 5.45136 0.902859 4.94015 1.28768 4.53103C2.30579 3.44821 3.32391 2.36519 4.34276 1.28335C4.65794 0.948838 5.10195 0.907146 5.4393 1.1762C5.81679 1.47739 5.87854 2.05289 5.57216 2.43455C5.50692 2.51579 5.43362 2.58963 5.36252 2.66541C4.86006 3.2002 4.35723 3.7344 3.85477 4.26899C3.83113 4.29432 3.80878 4.32023 3.76791 4.36601Z' fill='#2F80ED'/>
</svg>"
    />
  </AutoLayout>
)

const ReorderArrows = ({ kanban, setKanban, columnId, index, t, s }) => {
  const column = kanban[columnId]
  const isFirst = index === 0
  const isLast = index === column.items.length - 1

  const moveUp = () => {
    if (isFirst) return
    const newKanban = { ...kanban }
    const items = [...newKanban[columnId].items]
    ;[items[index - 1], items[index]] = [items[index], items[index - 1]]
    newKanban[columnId] = { ...newKanban[columnId], items }
    setKanban(newKanban)
  }

  const moveDown = () => {
    if (isLast) return
    const newKanban = { ...kanban }
    const items = [...newKanban[columnId].items]
    ;[items[index], items[index + 1]] = [items[index + 1], items[index]]
    newKanban[columnId] = { ...newKanban[columnId], items }
    setKanban(newKanban)
  }

  return (
    <AutoLayout direction="vertical" spacing={sc(2, s)} verticalAlignItems="center">
      <Frame
        name="Up"
        width={sc(12, s)}
        height={sc(12, s)}
        opacity={0.45}
        hoverStyle={{ opacity: isFirst ? 0.45 : 1 }}
        onClick={isFirst ? undefined : moveUp}
        tooltip="Move up"
      >
        <SVG
          width={sc(12, s)}
          height={sc(12, s)}
          src={`<svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M2 8L6 4L10 8' stroke='${t.arrowColor}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/>
</svg>`}
        />
      </Frame>
      <Frame
        name="Down"
        width={sc(12, s)}
        height={sc(12, s)}
        opacity={0.45}
        hoverStyle={{ opacity: isLast ? 0.45 : 1 }}
        onClick={isLast ? undefined : moveDown}
        tooltip="Move down"
      >
        <SVG
          width={sc(12, s)}
          height={sc(12, s)}
          src={`<svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
<path d='M2 4L6 8L10 4' stroke='${t.arrowColor}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/>
</svg>`}
        />
      </Frame>
    </AutoLayout>
  )
}

widget.register(App)
