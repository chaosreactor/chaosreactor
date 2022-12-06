import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Create AI generated content with Chaos Reactor',
    image: '/img/content_creation.svg',
    description: (
      <>
        Read help articles and watch tutorials for how to get started creating AI-generated content with Chaos Reactor.
      </>
    ),
  },
  {
    title: 'Contribute to Chaos Reactor development',
    image: '/img/development.svg',
    description: (
      <>
        Contribute to Chaos Reactor development and learn about the project's architecture.
      </>
    ),
  },
  {
    title: 'Learn about the Chaos Design System',
    image: '/img/design.svg',
    description: (
      <>
        Learn about the design principles and components and get involved with our open design process. 
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
