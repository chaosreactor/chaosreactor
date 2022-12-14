import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import shallow from 'zustand/shallow';

import { dispatch, events } from '../../bus';
import useAppStore, { AppState } from '../../store';

import { ImageGeneratorBlock } from '../playfield/blocks/image-generator';

import styles from './command-bar.module.css';

/* eslint-disable-next-line */
export interface CommandBarProps {}

const selector = (state: AppState) => ({
  commandBarOpen: state.commandBarOpen,
  setCommandBarOpen: state.setCommandBarOpen,
});

/**
 * Trigger the addition of a new block to the Playfield.
 *
 * @param blockType The block type to add.
 */
const triggerBlockAdd = (blockType: string | undefined) => {
  console.log('CommandBar: Add block', blockType);
  dispatch({ type: events.blocks.add, payload: { blockType } });
};

export function CommandBar(props: CommandBarProps) {
  const [value, setValue] = useState('button');

  const { commandBarOpen, setCommandBarOpen } = useAppStore(selector, shallow);

  const onValueChange = (value: string) => {
    setValue(value);
  };

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        if ((e.target as HTMLElement).tagName === 'BODY')
          setCommandBarOpen(!commandBarOpen);
      }
    };

    document.body.addEventListener('keydown', down);
    return () => document.body.removeEventListener('keydown', down);
  }, [setCommandBarOpen, commandBarOpen]);

  return (
    <Command.Dialog open={commandBarOpen} onOpenChange={setCommandBarOpen}>
      <div className={styles['framer']}>
        <Command
          value={value}
          onValueChange={onValueChange}
          onKeyDown={(e) => {
            // Escape goes to previous page
            // Backspace goes to previous page when search is empty
            if (e.key === 'Enter') {
              e.preventDefault();

              // Since we can't see the search terms, we have to use the value
              // of the selected item in the DOM. This is a hack, but it works.
              // @see https://github.com/pacocoursey/cmdk/issues/68

              const selected = document.querySelector(
                '[aria-selected="true"]'
              ) as HTMLElement;

              const selectedValue = selected?.getAttribute('data-value');

              // Trigger the addition of the selected block.
              triggerBlockAdd(selectedValue || '');

              // Close the command bar.
              setCommandBarOpen(false);
            }
          }}
        >
          <div cmdk-framer-header="">
            <SearchIcon />
            <Command.Input autoFocus placeholder="Search for blocks" />
          </div>
          <Command.List>
            <div cmdk-framer-items="">
              <div cmdk-framer-left="">
                <Command.Group heading="Generators">
                  <Item
                    value="Generate image"
                    subtitle="Text description to image"
                    onValueChange={onValueChange}
                    setCommandBarOpen={setCommandBarOpen}
                  >
                    <Icon icon="noto:framed-picture" />
                  </Item>
                  <Item
                    value="Generate text"
                    subtitle="Expand a prompt"
                    onValueChange={onValueChange}
                    setCommandBarOpen={setCommandBarOpen}
                  >
                    <Icon icon="noto:memo" />
                  </Item>
                </Command.Group>
                <Command.Group heading="Operations">
                  <Item
                    value="Classify"
                    subtitle="Group, identify, or categorize"
                    onValueChange={onValueChange}
                    setCommandBarOpen={setCommandBarOpen}
                  >
                    <Icon icon="noto:bullseye" />
                  </Item>
                </Command.Group>
                <Command.Group heading="Source data">
                  <Item
                    value="Images"
                    subtitle="Use existing images"
                    onValueChange={onValueChange}
                    setCommandBarOpen={setCommandBarOpen}
                  >
                    <Icon icon="noto:framed-picture" />
                  </Item>
                  <Item
                    value="Text"
                    subtitle="Enter text or select files"
                    onValueChange={onValueChange}
                    setCommandBarOpen={setCommandBarOpen}
                  >
                    <Icon icon="noto:memo" />
                  </Item>
                  <Item
                    value="Movies"
                    subtitle="Select movie files or URLs"
                    onValueChange={onValueChange}
                    setCommandBarOpen={setCommandBarOpen}
                  >
                    <Icon icon="noto:movie-camera" />
                  </Item>
                </Command.Group>
              </div>
              <hr cmdk-framer-separator="" />
              <div cmdk-framer-right="">
                {value === 'generate image' && <ImageGeneratorBlock />}
                {value === 'input' && <Input />}
                {value === 'badge' && <Badge />}
                {value === 'radio' && <Radio />}
                {value === 'slider' && <Slider />}
                {value === 'container' && <Container />}
              </div>
            </div>
          </Command.List>
        </Command>
      </div>
    </Command.Dialog>
  );
}

function Input() {
  return <input type="text" placeholder="Placeholder" />;
}

function Badge() {
  return <div cmdk-framer-badge="">Badge</div>;
}

function Radio() {
  return (
    <label cmdk-framer-radio="">
      <input type="radio" defaultChecked />
      Radio Button
    </label>
  );
}

function Slider() {
  return (
    <div cmdk-framer-slider="">
      <div />
    </div>
  );
}

function Container() {
  return <div cmdk-framer-container="" />;
}

function Item({
  children,
  value,
  onValueChange,
  setCommandBarOpen,
  subtitle,
}: {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  setCommandBarOpen: (open: boolean) => void;
  subtitle: string;
}) {
  const onSelect = (e: unknown) => {
    // Change the value.
    onValueChange(value);

    // Trigger the addition of a new block.
    triggerBlockAdd(value.toLowerCase());

    // Close the command bar.
    setCommandBarOpen(false);
  };

  return (
    <Command.Item value={value} onSelect={onSelect}>
      <div cmdk-framer-icon-wrapper="">{children}</div>
      <div cmdk-framer-item-meta="">
        {value}
        <span cmdk-framer-item-subtitle="">{subtitle}</span>
      </div>
    </Command.Item>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}