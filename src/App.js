import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import { Fragment, Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
