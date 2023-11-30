import { useState } from 'react';

import MenuButton from '../MenuButton';
import { MenuButtonProps, MenuButtonVariation } from '../MenuButton/MenuButtonProps';
import { MenuProps } from './MenuProps';

const changeSelected = (
  variation: MenuButtonVariation,
  buttonsSetter: React.Dispatch<React.SetStateAction<MenuButtonProps[]>>,
): void => {
  buttonsSetter((buttons) => {
    const newButtons = buttons.map((button) => {
      if (button.variation === variation) {
        return {
          ...button,
          currentSelected: true,
        }
      }

      return {
        ...button,
        currentSelected: false,
      }
    });

    return newButtons;
  });
}

const containerStyles = 'flex gap-8 flex-col justify-center items-center w-max h-max';

const Menu = ({
  cashierAction,
  clientAction,
  employeeAction,
  productAction,
  reportAction,
}: MenuProps): JSX.Element => {
  const [buttons, setButtons] = useState<MenuButtonProps[]>([
    {
      variation: 'cashier',
      currentSelected: true,
      onClick: cashierAction,
    },
    {
      variation: 'client',
      currentSelected: false,
      onClick: clientAction,
    },
    {
      variation: 'employee',
      currentSelected: false,
      onClick: employeeAction,
    },
    {
      variation: 'product',
      currentSelected: false,
      onClick: productAction,
    },
    {
      variation: 'report',
      currentSelected: false,
      onClick: reportAction,
    },
  ]);

  return (
    <div className={containerStyles}>
      {
        buttons.map(({ currentSelected, variation, onClick }) => (
          <MenuButton
            key={variation}
            variation={variation}
            currentSelected={currentSelected}
            onClick={() => {
              changeSelected(variation!, setButtons);
              onClick();
            }}
          />
        ))
      }
    </div>
  )
}

export default Menu;