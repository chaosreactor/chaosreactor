import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import { ImageGeneratorBlock } from '../playfield/blocks/image-generator';

import styles from './command-bar.module.css';

// Default command bar options.
export const actions = [
  {
    id: 'add-block',
    name: 'Add block',
    shortcut: ['b'],
    keywords: 'blocks add',
    perform: () => console.log('Add block'),
  },
];

/* eslint-disable-next-line */
export interface CommandBarProps {}

export function CommandBar(props: CommandBarProps) {
  const [value, setValue] = useState('button');
  const [open, setOpen] = useState(false);

  const onValueChange = (value: string) => {
    setValue(value);
  };

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        if ((e.target as HTMLElement).tagName === 'BODY')
          setOpen((open) => !open);
      }
    };

    document.body.addEventListener('keydown', down);
    return () => document.body.removeEventListener('keydown', down);
  }, [open]);

  return (
    <Command.Dialog open={open} onOpenChange={setOpen}>
      <div className={styles['framer']}>
        <Command value={value} onValueChange={onValueChange}>
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
                  >
                    <Icon icon="noto:framed-picture" />
                  </Item>
                  <Item value="Generate text" subtitle="Expand a prompt">
                    <Icon icon="noto:memo" />
                  </Item>
                </Command.Group>
                <Command.Group heading="Operations">
                  <Item
                    value="Classify"
                    subtitle="Group, identify, or categorize"
                  >
                    <Icon icon="noto:bullseye" />
                  </Item>
                </Command.Group>
                <Command.Group heading="Source data">
                  <Item value="Images" subtitle="Use existing images">
                    <Icon icon="noto:framed-picture" />
                  </Item>
                  <Item value="Text" subtitle="Enter text or select files">
                    <Icon icon="noto:memo" />
                  </Item>
                  <Item value="Movies" subtitle="Select movie files or URLs">
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
  subtitle,
}: {
  children: React.ReactNode;
  value: string;
  subtitle: string;
}) {
  return (
    <Command.Item value={value} onSelect={() => {}}>
      <div cmdk-framer-icon-wrapper="">{children}</div>
      <div cmdk-framer-item-meta="">
        {value}
        <span cmdk-framer-item-subtitle="">{subtitle}</span>
      </div>
    </Command.Item>
  );
}

function ButtonIcon() {
  return <Icon icon="noto:collision" />;
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
