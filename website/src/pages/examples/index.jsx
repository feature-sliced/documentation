import React, {useState, useMemo, useCallback, useEffect} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import {ExampleCard} from '@site/src/entities/example';

import { examples } from './_config';
import styles from "./styles.module.css";


const TITLE = 'Examples';
const DESCRIPTION = 'List of websites people are building with Feature Sliced';
const EDIT_URL = 'https://github.com/feature-sliced/documentation/edit/master/website/src/pages/examples/_config.js';
const EXAMPLES_URL = 'https://github.com/feature-sliced/examples';
 
function ExamplesPage() {
    return (
     <Layout title={TITLE} description={DESCRIPTION}>
       <main className="container margin-vert--lg">
        <div className="text--center">
            <h1>{TITLE}</h1>
            <p>{DESCRIPTION}</p>
            <div className={clsx('button-group', styles.buttonGroup)}>
                <a className={clsx('button','button--primary', styles.buttonGroupItem)} href={EDIT_URL} target={'_blank'}>
                    🙏 Add your site now!
                </a>
                <a className={clsx('button','button--secondary', styles.buttonGroupItem)} href={EXAMPLES_URL} target={'_blank'}>
                    Examples Repository
                </a>
            </div>
            <div className="margin-top--sm">
                <a href="/versions">
                    See also versions list
                </a>
            </div>
        </div>
         <section className="container margin-top--lg">
            <div className="margin-top--lg">
                <div className="row">
                    {examples.map((data) => (
                        <article key={data.title} className='col col--4 margin-bottom--lg'>
                            <ExampleCard data={data} />
                        </article>
                    ))}
                </div>
            </div>
        </section>
       </main>
     </Layout>
   );
 }
 
 export default ExamplesPage;